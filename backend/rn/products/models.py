# -*- coding: utf-8 -*-
from django.conf import settings
from django.db import models


SHIPMENT_CHOICES = (
    ('courier', 'Курьер'),
    ('pick-up', 'Забрать с магазина'),
)

CATEGORIES_CHOICES = (
    (0, '-'),
    (1, 'Мыломойка'),
    (2, 'Хоз товары'),
)


ORDER_STATUS = (
    ('processing', 'Обрабатывается'),
    ('processed', 'Подтвержден'),
    ('shipped', 'Отправлен'),
    ('picked-up', 'Получил'),
    ('complete', 'Выполнен'),
    ('canceled', 'Отменен'),
)


class Product(models.Model):
    title = models.CharField(verbose_name='Наименование товара', max_length=255)
    category = models.IntegerField(verbose_name='Категория', choices=CATEGORIES_CHOICES, default=0)
    code = models.CharField(verbose_name='Артикул', max_length=255, blank=True, db_index=True)
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


class Order(models.Model):
    shipment_price = models.PositiveIntegerField(verbose_name='Стоимость доставки', null=True, blank=True)
    total_price = models.PositiveIntegerField(verbose_name=u'Итого')
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='orders', verbose_name='Заказы')
    shipment_method = models.CharField(max_length=100, choices=SHIPMENT_CHOICES, blank=True)
    shipment_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=255, choices=ORDER_STATUS, default=ORDER_STATUS[0][0])


class OrderProducts(models.Model):
    order = models.ForeignKey(Order, related_name='products', verbose_name='Товары')
    product = models.ForeignKey(Product, related_name='order_products', verbose_name='Товар')
    quantity = models.PositiveIntegerField(verbose_name='Количество')
    price = models.PositiveIntegerField(verbose_name='Цена за единицу товара')
    total_price = models.PositiveIntegerField(verbose_name='Общая цена')

