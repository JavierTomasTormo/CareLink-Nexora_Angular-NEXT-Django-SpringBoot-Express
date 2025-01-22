from django.urls import path
from .views import UserPatientList

urlpatterns = [
    path('users/patient/', UserPatientList.as_view(), name='userpatient-list'),
]
