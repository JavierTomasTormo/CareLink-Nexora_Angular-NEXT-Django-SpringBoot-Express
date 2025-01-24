from django.urls import path
from .views import YearList, YearDetail

urlpatterns = [
    path('timetables/year/', YearList.as_view(), name='year-list'),
    path('timetables/year/<int:pk>/', YearDetail.as_view(), name='year-detail'),
]