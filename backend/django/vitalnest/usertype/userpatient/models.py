from django.db import models
from vitalnest.usertype.user.models import User

class UserPatient(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patients', db_column='id_user', blank=True, null=True)
    email = models.EmailField(max_length=255, unique=True)
    name_patient = models.CharField(max_length=255)
    allergies = models.JSONField()
    difficulties = models.JSONField()
    discapacity = models.IntegerField()
    isActive = models.IntegerField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    phone_number = models.CharField(max_length=20)
    birthday = models.CharField(max_length=255)

    class Meta:
        ordering = ['-createdAt']
        db_table = 'userpatient'

    def __str__(self):
        return self.name_patient
