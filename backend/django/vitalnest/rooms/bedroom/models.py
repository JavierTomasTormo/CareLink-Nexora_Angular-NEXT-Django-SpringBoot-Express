from django.db import models
from vitalnest.usertype.userpatient.models import UserPatient

class BedRoom(models.Model):
    type_room = models.CharField(max_length=50)
    num_room = models.IntegerField()
    id_patient = models.ForeignKey(UserPatient, on_delete=models.CASCADE, related_name='bedrooms',db_column='id_patient', blank=True, null=True)
    description = models.CharField(max_length=255)
    availability = models.CharField(max_length=255)
    special_features = models.JSONField()
    isactive = models.IntegerField()
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'bedroom'
