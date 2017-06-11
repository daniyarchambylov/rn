from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token

from rn.accounts import views as account_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^sign-in/$', obtain_jwt_token),
    url(r'^sign-up/$', account_views.SignUpView.as_view()),
]
