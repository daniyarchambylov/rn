# -*- coding: utf-8 -*-
from rest_framework import viewsets, permissions

from .models import Product
from .serializers import ProductsSerializer


class ProductsViewSet(viewsets.ModelViewSet):
    serializer_class = ProductsSerializer
    queryset = Product.objects.all()
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
