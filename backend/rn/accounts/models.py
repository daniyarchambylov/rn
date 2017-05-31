from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

# -*- coding: utf-8 -*-


class UserManager(models.Manager):
    def _create_user(self, phone, password, **kwargs):
        if not phone:
            raise ValueError('The phone is required.')
        user = self.model(phone=phone, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, phone, password, **kwargs):
        kwargs.setdefault('is_staff', False)
        kwargs.setdefault('is_superuser', False)
        return self._create_user(phone, password, **kwargs)

    def create_superuser(self, phone, password, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)

        if not kwargs.get('is_staff'):
            raise ValueError('User has to be staff member')

        if not kwargs.get('is_superuser'):
            raise ValueError('User has to be superuser')

        return self._create_user(phone, password, **kwargs)

    def get_by_natural_key(self, username):
        return self.get(**{self.model.USERNAME_FIELD: username})


class User(AbstractBaseUser, PermissionsMixin):
    phone = models.CharField(max_length=12, unique=True)
    name = models.CharField(max_length=255, blank=True)
    date_joined = models.DateTimeField(auto_created=True, auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    email = models.EmailField(blank=True, db_index=True)

    USERNAME_FIELD = 'phone'

    objects = UserManager()

    def get_short_name(self):
        return self.name

    def get_full_name(self):
        return self.name
