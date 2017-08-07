# -*- coding: utf-8 -*-
import re

from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import UserRoleRequest

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'phone',
            'password',
            'role',
        ]

    def validate_phone(self, value):
        if not re.match(r'[0-9\-\(\)\[\]\ +]', value):
            raise serializers.ValidationError('Неправильный формат ввода.')
        phone = re.sub(r'[\-\(\)\[\]\ +]','', value)
        if phone.startswith('0'):
            phone = '996{}'.format(phone[1:])
        elif not phone.startswith('996'):
            phone = '996{}'.format(phone)
        if len(phone) != 12:
            raise serializers.ValidationError('Неправильный формат ввода.')

        if User.objects.filter(phone=phone).exists():
            raise serializers.ValidationError('Пользователь с таким номером телефона уже существует.')

        return phone

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['phone'], validated_data['password'], role=validated_data['role'])
        return user

    def to_representation(self, instance):
        res = super(UserCreateSerializer, self).to_representation(instance)
        res.pop('password')
        return res


class UserRoleRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRoleRequest
        fields = '__all__'


class UserProfile(serializers.ModelSerializer):
    city = serializers.IntegerField(source='get_city')
    region = serializers.IntegerField(source='get_region')
    block = serializers.IntegerField(source='get_block')

    class Meta:
        model = User
        fields = [
            'id',
            'phone',
            'first_name',
            'last_name',
            'name',
            'address',
            'zip_code',
            'location',
            'city',
            'region',
            'block',
            'email',
            'updated_at',
            'role',
            'image',
            'is_superuser',
        ]


class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'image',
        ]
