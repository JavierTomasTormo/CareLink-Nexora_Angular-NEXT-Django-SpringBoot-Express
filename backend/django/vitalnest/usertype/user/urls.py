from django.urls import path
from .views import UserList, UserDetail
from .views import VerifyRefreshTokenView

urlpatterns = [
    path('users/tutor/', UserList.as_view(), name='user-list'),
    path('users/tutor/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('verify-refresh-token/', VerifyRefreshTokenView.as_view(), name='verify-refresh-token'),

]