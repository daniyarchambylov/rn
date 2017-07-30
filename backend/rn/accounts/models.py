# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _

USER_ROLE_CHOICES = (
    ('user', _('Пользователь')),
    ('storehouse', _('Компания')),
    ('store', _('Торговая точка')),
)


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
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    zip_code = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=255, blank=True)
    date_joined = models.DateTimeField(auto_created=True, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    email = models.EmailField(blank=True, db_index=True)
    role = models.CharField(max_length=50, choices=USER_ROLE_CHOICES, default=USER_ROLE_CHOICES[0][0])
    image = models.ImageField(upload_to='users', null=True, blank=True)

    USERNAME_FIELD = 'phone'

    objects = UserManager()

    def get_short_name(self):
        return self.name

    def get_full_name(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.id:
            if self.role == USER_ROLE_CHOICES[0][0]:
                self.is_approved = True
        return super(User, self).save(*args, **kwargs)


USER_REQUEST_STATUS_CHOICES = (
    ('pending', _('В обработке')),
    ('approved', _('Подтвержден')),
    ('denied', _('Отклонен')),
)


class UserRoleRequest(models.Model):
    user = models.ForeignKey(User)
    role = models.CharField(max_length=50, choices=USER_ROLE_CHOICES)
    status = models.CharField(max_length=25, choices=USER_REQUEST_STATUS_CHOICES, default=USER_REQUEST_STATUS_CHOICES[0][0])
    created_at = models.DateTimeField(auto_now_add=True)

    def _save_user(self):
        user = self.user
        user.role = self.role
        user.save()

    def approve(self):
        self.status = USER_REQUEST_STATUS_CHOICES[1][0]
        self.save()
        self._save_user()

    def deny(self):
        self.status = USER_REQUEST_STATUS_CHOICES[2][0]
        self.save()
        self._save_user()
