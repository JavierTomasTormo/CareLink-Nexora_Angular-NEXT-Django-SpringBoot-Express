from django.db import models
from vitalnest.health.medications.models import Medications
from vitalnest.usertype.userpatient.models import UserPatient
from vitalnest.timetables.hour.models import Hour

class Prescription(models.Model):
    id_medication = models.ForeignKey(Medications, on_delete=models.CASCADE, related_name='id_medication', db_column='id_medication', blank=True, null=True)
    id_patient = models.ForeignKey(UserPatient, on_delete=models.CASCADE, related_name='id_patient', db_column='id_patient', blank=True, null=True)
    dosage = models.CharField(max_length=50)
    start_hour = models.ForeignKey(Hour, on_delete=models.CASCADE, related_name='id_hour', db_column='id_hour', blank=True, null=True)
    duration_days = models.IntegerField()
    isactive = models.IntegerField()
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'prescription'

    def __str__(self):
        return self.dosage
