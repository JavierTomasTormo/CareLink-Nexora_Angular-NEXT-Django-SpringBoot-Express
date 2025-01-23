from django.db import models
from vitalnest.usertype.user.models import User
from vitalnest.activities.models import Activity
from vitalnest.timetables.hour.models import Hour
from vitalnest.timetables.day.models import Day
from vitalnest.timetables.month.models import Month
from vitalnest.timetables.year.models import Year
from vitalnest.usertype.userpatient.models import UserPatient

class Inscription(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inscriptions', db_column='id_user', blank=True, null=True)
    email = models.EmailField(max_length=255)
    id_activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='inscriptions', db_column='id_activity', blank=True, null=True)
    id_hour = models.ForeignKey(Hour, on_delete=models.CASCADE, related_name='inscriptions', db_column='id_hour', blank=True, null=True)
    id_day = models.ForeignKey(Day, on_delete=models.CASCADE, related_name='inscriptions', db_column='id_day', blank=True, null=True)
    id_month = models.ForeignKey(Month, on_delete=models.CASCADE, related_name='inscriptions', db_column='id_month', blank=True, null=True)
    id_year = models.ForeignKey(Year, on_delete=models.CASCADE, related_name='inscriptions', db_column='id_year', blank=True, null=True)
    id_payment = models.OneToOneField('payment.Payment', on_delete=models.CASCADE, related_name='inscription', db_column='id_payment', blank=True, null=True)
    id_patient = models.ForeignKey(UserPatient, on_delete=models.CASCADE, related_name='inscriptions', db_column='id_patient', blank=True, null=True)
    isactive = models.IntegerField()
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)
    state = models.CharField(max_length=50)
    special_request = models.CharField(max_length=255)

    class Meta:
        db_table = 'inscriptions'
