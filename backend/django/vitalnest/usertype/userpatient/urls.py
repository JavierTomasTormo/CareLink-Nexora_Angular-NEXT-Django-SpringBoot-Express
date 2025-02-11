from django.urls import path
from .views import UserPatientList, UserPatientDetail

urlpatterns = [
    path('users/patient/', UserPatientList.as_view(), name='userpatient-list'),
    path('users/patient/<int:pk>/', UserPatientDetail.as_view(), name='userpatient-detail'),
]