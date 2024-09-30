from django.urls import path, include
from .views import UserViewSet
from rest_framework import routers

# Makes it possible to send Http-requests to the /users backend
router = routers.DefaultRouter()
router.register('users', UserViewSet)
from django.urls import path
from .views import get_user_id

urlpatterns = [
    path('', include(router.urls)),
    path('get_user_id/', get_user_id, name='get_user_id'),
]