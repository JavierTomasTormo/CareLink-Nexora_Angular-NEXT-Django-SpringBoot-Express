from django.db import models

class User(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    isactive = models.IntegerField()
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    profile_img = models.CharField(max_length=255)

    class Meta:
        ordering = ['-createdat']
        db_table = 'users'

    def __str__(self):
        return self.name
