# -*- coding: utf-8 -*-
from rest_framework.permissions import BasePermission


class UserRoleRequestPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user and (request.method == 'POST' or request.user.is_staff)
