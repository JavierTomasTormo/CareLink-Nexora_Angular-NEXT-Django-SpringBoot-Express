from django.urls import path
from .views import UserList, UserDetail

urlpatterns = [
    path('users/tutor/', UserList.as_view(), name='user-list'),
    path('users/tutor/<int:pk>/', UserDetail.as_view(), name='user-detail'),
]