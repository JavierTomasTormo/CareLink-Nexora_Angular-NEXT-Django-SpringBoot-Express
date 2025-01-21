from django.db import models

class Hour(models.Model):
    id = models.IntegerField(primary_key=True)
    hour = models.TimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hour'

    def __str__(self):
        return str(self.hour)