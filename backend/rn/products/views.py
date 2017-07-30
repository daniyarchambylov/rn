# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, status
from rest_framework import mixins
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response

from .models import Product, ProductImage, Order
from .serializers import ProductsSerializer, OrdersSerializer, OrderProductsSerializer, ProductImagesSerializer, \
    OrderProductsCreateSerializer


class ProductsViewSet(viewsets.ModelViewSet):
    serializer_class = ProductsSerializer
    queryset = Product.objects.prefetch_related('images').all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return super(ProductsViewSet, self).get_queryset().filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data
        ctx = {'request': request}
        data['user'] = request.user.id

        serializer = self.get_serializer(data=data, context=ctx)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ProductImagesViewSet(viewsets.ModelViewSet):
    serializer_class = ProductImagesSerializer
    queryset = ProductImage.objects.all()


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
        data['user'] = request.user.id

        products = data.pop('products', [])

        for p in products:
            p['product'] = p['id']

        order_serializer = OrdersSerializer(data=data, context=ctx)
        order_products_serializer = OrderProductsCreateSerializer(data=products, context=ctx, many=True)

        order_serializer.is_valid(raise_exception=True)
        order_products_serializer.is_valid(raise_exception=True)

        order = order_serializer.save()
        order_products_serializer.save(order=order)

        headers = self.get_success_headers(order_serializer.data)
        return Response(order_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @detail_route(methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def products(self, request, pk=None, **kwargs):
        instance = get_object_or_404(Order, pk=pk)
        products = instance.products.all()
        serializer = OrderProductsSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

    @list_route(methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def as_company(self, request, pk=None, **kwargs):
        orders = Order.objects\
            .prefetch_related('products', 'products__product', 'products__product__user')\
            .filter(products__product__user=request.user)
        serializer = OrdersSerializer(orders, many=True, context={'request': request})
        return Response(serializer.data)
