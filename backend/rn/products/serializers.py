# -*- coding: utf-8 -*-
from rest_framework import serializers

from .models import Product, ProductImage, Order, OrderProducts


class ProductsSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, instance):
        image = instance.images.first()

        request = self.context.get('request')
        if image and request:
            return request.build_absolute_uri(image.image.url)
        elif image:
            return image.image.url
        return None

    def get_images(self, instance):
        images = instance.images.all()[:5]

        request = self.context.get('request')
        return map(lambda x: request.build_absolute_uri(x.image.url), images)


class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


class OrdersSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(read_only=True, source='user.name')
    class Meta:
        model = Order
        fields = '__all__'


class OrderProductsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProducts
        exclude = [
            'order',
        ]


class OrderProductsSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='product.title')
    code = serializers.CharField(source='product.code')
    image = serializers.SerializerMethodField()

    class Meta:
        model = OrderProducts
        exclude = [
            'order',
        ]

    def get_image(self, instance):
        image = instance.product.images.first()

        request = self.context.get('request')
        if image and request:
            return request.build_absolute_uri(image.image.url)
        elif image:
            return image.image.url
        return None
