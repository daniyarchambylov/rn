# -*- coding: utf-8 -*-
from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import UserRoleRequest

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'phone',
            'password'
        ]

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['phone'], validated_data['password'])
        return user

    def to_representation(self, instance):
        res = super(UserCreateSerializer, self).to_representation(instance)
        res.pop('password')
        return res


class UserRoleRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRoleRequest
        fields = '__all__'
