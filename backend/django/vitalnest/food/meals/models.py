from django.db import models

class Meals(models.Model):
    img = models.CharField(max_length=255)
    isactive = models.IntegerField()
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)
    role = models.JSONField()
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    allergens = models.JSONField()
    calories = models.IntegerField()
    type_meal = models.JSONField()

    class Meta:
        db_table = 'meals'
