from django.urls import path
from .views import UserList

urlpatterns = [
    path('users/tutor/', UserList.as_view(), name='user-list'),
]
