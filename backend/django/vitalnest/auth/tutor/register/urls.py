from django.urls import path
from .views import RegisterTutorView

urlpatterns = [
    path('auth/tutor/register', RegisterTutorView.as_view(), name='register_tutor'),
]