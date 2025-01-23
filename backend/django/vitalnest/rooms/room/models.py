from django.db import models

class Room(models.Model):
    type_room = models.CharField(max_length=50)
    num_room = models.IntegerField()
    capacity = models.IntegerField()
    description = models.CharField(max_length=255)
    isactive = models.IntegerField()
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)
    availability = models.CharField(max_length=255)

    class Meta:
        db_table = 'rooms'
