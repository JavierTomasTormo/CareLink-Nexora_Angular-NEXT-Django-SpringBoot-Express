from django.db import models

class Role(models.Model):
    role = models.CharField(max_length=50)

    class Meta:
        db_table = 'roles'

    def __str__(self):
        return self.role