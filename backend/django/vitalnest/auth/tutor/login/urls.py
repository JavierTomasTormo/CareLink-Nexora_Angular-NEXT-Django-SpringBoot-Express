from django.urls import path
from .views import LoginTutorView

urlpatterns = [
    path('auth/tutor/login', LoginTutorView.as_view(), name='login_tutor'),
]