# -*- coding: utf-8 -*-
from django.contrib.auth import get_user_model
from rest_framework import status, viewsets, permissions, mixins
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserRoleRequest
from .permissions import UserRoleRequestPermission
from .serializers import UserCreateSerializer, UserRoleRequestSerializer, UserProfile

User = get_user_model()


class SignUpView(APIView):
    def post(self, request, format='json'):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
