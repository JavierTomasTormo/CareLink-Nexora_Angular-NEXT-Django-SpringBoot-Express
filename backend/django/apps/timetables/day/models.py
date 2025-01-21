from django.db import models

class Day(models.Model):
    day = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'day'

    def __str__(self):
        return str(self.day)