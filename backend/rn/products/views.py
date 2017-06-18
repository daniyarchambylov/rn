# -*- coding: utf-8 -*-
from rest_framework import viewsets, permissions, status
from rest_framework import mixins
from rest_framework.response import Response

from .models import Product, Order
from .serializers import ProductsSerializer, OrdersSerializer, OrderProductsSerializer


class ProductsViewSet(viewsets.ModelViewSet):
    serializer_class = ProductsSerializer
    queryset = Product.objects.all()
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]


class OrdersViewSet(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    queryset = Order.objects.all()
    serializer_class = OrdersSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        user = self.request.user
        return super(OrdersViewSet, self).get_queryset().filter(user=user)

    def create(self, request, *args, **kwargs):
        data = request.data
        ctx = {'request': request}

        order_serializer = OrdersSerializer(data=data, context=ctx)
        order_products_serializer = OrderProductsSerializer(data=data, context=ctx)

        order_serializer.is_valid(raise_exception=True)
        order_products_serializer.is_valid(raise_exception=True)

        order = order_serializer.save()
        order_products_serializer.save(order=order)

        headers = self.get_success_headers(order_serializer.data)
        return Response(order_serializer.data, status=status.HTTP_201_CREATED, headers=headers)
