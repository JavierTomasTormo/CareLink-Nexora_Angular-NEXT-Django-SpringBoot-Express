from django.urls import path
from .views import ActivityList, ActivityDetail

urlpatterns = [
    # Get all, Create
    path('activities/', ActivityList.as_view(), name='activity-list'),
    
    # Get one, Update, Delete 
    path('activities/<int:pk>/', ActivityDetail.as_view(), name='activity-detail'),
]
