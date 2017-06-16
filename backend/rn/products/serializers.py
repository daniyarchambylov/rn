# -*- coding: utf-8 -*-
from rest_framework import serializers

from .models import Product, Order, OrderProducts


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class OrderProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProducts
        exclude = [
            'order',
        ]
