from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

from .accounts import views as account_views
from .products import views as product_views

router = DefaultRouter()
router.register(r'products', product_views.ProductsViewSet)
urlpatterns = router.urls

urlpatterns += [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^sign-in/$', obtain_jwt_token),
    url(r'^sign-up/$', account_views.SignUpView.as_view()),
]
