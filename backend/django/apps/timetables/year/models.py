from django.db import models

class Year(models.Model):
    year = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'year'

    def __str__(self):
        return str(self.year)