from django.db import models

class Month(models.Model):
    month = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'month'

    def __str__(self):
        return str(self.month)