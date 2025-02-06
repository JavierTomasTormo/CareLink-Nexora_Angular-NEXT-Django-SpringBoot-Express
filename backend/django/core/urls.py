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
        path('api/', include('vitalnest.auth.tutor.login.urls')),
        path('api/', include('vitalnest.auth.tutor.logout.urls')),
]