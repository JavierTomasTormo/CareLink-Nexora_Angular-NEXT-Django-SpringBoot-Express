from django.db import models

class Medications(models.Model):
    name = models.CharField(max_length=255)
    slug_medication = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    dosage = models.CharField(max_length=50)
    frecuency = models.IntegerField()
    manufacturer = models.CharField(max_length=255)
    instructions = models.CharField(max_length=255)
    isactive = models.IntegerField()
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)
    typeformat = models.CharField(max_length=50)

    class Meta:
        db_table = 'medications'

    def __str__(self):
        return self.name