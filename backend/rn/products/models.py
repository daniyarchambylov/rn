# -*- coding: utf-8 -*-
from django.conf import settings
from django.db import models


class Product(models.Model):
    title = models.CharField(verbose_name='Наименование товара', max_length=255)
    code = models.CharField(verbose_name='Артикул', max_length=255, blank=True)
    quantity = models.PositiveIntegerField(verbose_name='Количество')
    created_on = models.DateField(verbose_name='Дата производства')
    expires_on = models.DateField(verbose_name='Срок хранения')
    weight = models.PositiveIntegerField(verbose_name='Вес', null=True, blank=True)
    volume = models.PositiveIntegerField(verbose_name='Вес', null=True, blank=True)
    price = models.PositiveIntegerField(verbose_name='Цена')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='products', verbose_name='Продавец')


class ProductImage(models.Model):
    product = models.ForeignKey(Product, verbose_name='Товар', related_name='images')
    image = models.ImageField(verbose_name='Изображение', upload_to='products')
