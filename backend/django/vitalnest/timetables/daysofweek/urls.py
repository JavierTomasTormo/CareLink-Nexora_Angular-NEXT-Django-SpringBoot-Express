from django.urls import path
from .views import DayofweekList, DayofweekDetail

urlpatterns = [
    path('timetables/dayofweek/', DayofweekList.as_view(), name='dayofweek-list'),
    path('timetables/dayofweek/<int:pk>/', DayofweekDetail.as_view(), name='dayofweek-detail'),
]