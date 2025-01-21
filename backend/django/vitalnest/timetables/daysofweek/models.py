from django.db import models

class Dayofweek(models.Model):
    day = models.CharField(max_length=20, blank=True, null=True)
    dayname = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        db_table = 'dayofweek'

    def __str__(self):
        return self.dayname