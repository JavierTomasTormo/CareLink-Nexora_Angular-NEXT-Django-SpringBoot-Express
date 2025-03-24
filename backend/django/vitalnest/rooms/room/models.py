from django.db import models

class Room(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=255)
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)
    width = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    description = models.CharField(max_length=255)
    floor = models.IntegerField(default=0)
    type_room = models.CharField(max_length=50, null=True, blank=True)
    num_room = models.IntegerField(null=True, blank=True)
    availability = models.CharField(max_length=255, null=True, blank=True)
    isactive = models.IntegerField(default=0)
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'rooms'

# from django.db import models

# class Room(models.Model):
#     type_room = models.CharField(max_length=50)
#     num_room = models.IntegerField()
#     capacity = models.IntegerField()
#     description = models.CharField(max_length=255)
#     isactive = models.IntegerField()
#     createdat = models.DateTimeField(auto_now_add=True)
#     updatedat = models.DateTimeField(auto_now=True)
#     availability = models.CharField(max_length=255)

#     class Meta:
#         db_table = 'rooms'
