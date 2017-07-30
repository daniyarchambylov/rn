from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

from .accounts import views as account_views
from .products import views as product_views

router = DefaultRouter()
router.register(r'api/products', product_views.ProductsViewSet)
router.register(r'api/product-images', product_views.ProductImagesViewSet)
router.register(r'api/orders', product_views.OrdersViewSet)
router.register(r'api/user-roles', account_views.UserRoleRequestsViewSet)
router.register(r'api/companies', account_views.CompaniesViewset)
router.register(r'api/stores', account_views.StoresViewset)

urlpatterns = router.urls

urlpatterns += [
    url(r'^api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/sign-in/$', obtain_jwt_token),
    url(r'^api/sign-up/$', account_views.SignUpView.as_view()),
    url(r'^api/profile/$', account_views.my_profile),
    url(r'^api/profile-pic/$', account_views.update_image),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
