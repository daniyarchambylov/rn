# -*- coding: utf-8 -*-
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, status
from rest_framework import mixins
from rest_framework.decorators import detail_route, list_route, api_view, permission_classes
from rest_framework.response import Response

from .models import Product, ProductImage, Order
from .serializers import ProductsSerializer, OrdersSerializer, OrderProductsSerializer, ProductImagesSerializer, \
    OrderProductsCreateSerializer, ProductsReportSerializer


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


@api_view(['GET', 'PATCH', 'PUT'])
# @permission_classes([permissions.IsAuthenticated])
def products_report(request, *args, **kwargs):
    instance = request.user
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    queryset = Order.objects\
        .values('products__product_id', 'products__product__title', 'user', 'user__name', 'user__phone',  'products__product__code')\
        .annotate(Sum('products__quantity'))\
        .annotate(Sum('products__total_price'))
        # .filter(products__product__user=instance)

    if start_date and end_date:
        queryset = queryset.filter(created__range=[start_date, end_date])
    elif start_date:
        queryset = queryset.filter(created__gte=start_date)
    elif end_date:
        queryset = queryset.filter(created__lte=end_date)

    products = dict()

    for qs in queryset:
        key = '{}_{}'.format(qs['user'], qs['products__product_id'])
        if key in products:
            products[key]['quantity'] += qs['products__quantity__sum']
            products[key]['total_price'] += qs['products__total_price__sum']
        else:
            products[key] = {
                'title': qs['products__product__title'],
                'quantity': qs['products__quantity__sum'],
                'total_price': qs['products__total_price__sum'],
                'user_name': qs['user__name'],
                'user_phone': qs['user__phone'],
                'code': qs['products__product__code'],
            }

    return Response(products.values())
