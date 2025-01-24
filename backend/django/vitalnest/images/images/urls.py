from django.urls import path
from .views import ImageList, ImageDetail

urlpatterns = [
    path('images/', ImageList.as_view(), name='image-list'),
    path('images/<int:pk>/', ImageDetail.as_view(), name='image-detail'),
]
