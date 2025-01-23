from django.db import models
from vitalnest.images.images.models import Images
from vitalnest.rooms.room.models import Room

class ImagesRooms(models.Model):
    id_img = models.ForeignKey(Images, on_delete=models.CASCADE, related_name='room_images',db_column='id_img', blank=True, null=True)
    id_room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='images',db_column='id_room', blank=True, null=True)
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'imagesrooms'
