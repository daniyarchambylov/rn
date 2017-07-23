# -*- coding: utf-8 -*-
from django.contrib.auth import get_user_model
from rest_framework import status, viewsets, permissions, mixins
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.views import APIView
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.utils import jwt_response_payload_handler

from .models import UserRoleRequest
from .permissions import UserRoleRequestPermission
from .serializers import UserCreateSerializer, UserRoleRequestSerializer, UserProfile

User = get_user_model()


class SignUpView(APIView):
    def post(self, request, format='json'):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        data = {
            'phone': instance.phone,
            'password': request.data.get('password')
        }
        serializer = JSONWebTokenSerializer(data=data)

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')
            response_data = jwt_response_payload_handler(token, user, request)
            return Response(response_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserRoleRequestsViewSet(viewsets.ModelViewSet):
    queryset = UserRoleRequest.objects.all()
    serializer_class = UserRoleRequestSerializer
    permission_classes = [
        UserRoleRequestPermission,
    ]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


@api_view(['GET', 'PATCH', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
def my_profile(request, *args, **kwargs):
    instance = request.user
    print(request.method, request.data)
    result = None
    if request.method == 'GET':
        serializer = UserProfile(instance, context={'request': request})
        result = serializer.data
    elif request.method in ['PATCH', 'PUT']:
        partial = request.method == 'PATCH'
        serializer = UserProfile(instance, data=request.data, partial=partial, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        result = serializer.data
    return Response(result)
