from django.db import models

class Hour(models.Model):
    hour = models.TimeField()
    
    class Meta:
        db_table = 'hour'


    def __str__(self):
        return str(self.hour)