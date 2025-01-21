from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ActivityViewSet

router = DefaultRouter()
router.register(r'activities', ActivityViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
