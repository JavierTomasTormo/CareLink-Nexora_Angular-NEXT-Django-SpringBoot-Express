"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # path('admin/', admin.site.urls),

    # Activities ####################
        path('api/', include('vitalnest.activities.urls')),

    # Users ####################
        path('api/', include('vitalnest.usertype.user.urls')),
        path('api/', include('vitalnest.usertype.userpatient.urls')),

    # Meals ####################
    path('api/', include('vitalnest.food.meals.urls')),

    # Images ####################
        path('api/', include('vitalnest.images.images.urls')),
        path('api/', include('vitalnest.images.imagesactivities.urls')),
        path('api/', include('vitalnest.images.imagesrooms.urls')),

    # Rooms ####################
        path('api/', include('vitalnest.rooms.room.urls')),
        path('api/', include('vitalnest.rooms.bedroom.urls')),

    # TimeTables ####################
        path('api/', include('vitalnest.timetables.day.urls')),
        path('api/', include('vitalnest.timetables.daysofweek.urls')),
        path('api/', include('vitalnest.timetables.hour.urls')),
        path('api/', include('vitalnest.timetables.month.urls')),
        path('api/', include('vitalnest.timetables.year.urls')),

    # AUTH #####################
        path('api/', include('vitalnest.auth.tutor.register.urls')),
]