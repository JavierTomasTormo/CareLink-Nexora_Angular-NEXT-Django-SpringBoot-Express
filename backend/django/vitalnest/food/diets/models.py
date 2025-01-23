from django.db import models
from vitalnest.food.meals.models import Meals

class Diets(models.Model):
    id_lunch = models.ForeignKey(Meals, on_delete=models.CASCADE, related_name='lunch_diets',db_column='id_lunch', blank=True, null=True)
    id_breakfast = models.ForeignKey(Meals, on_delete=models.CASCADE, related_name='breakfast_diets',db_column='id_breakfast', blank=True, null=True)
    id_snack = models.ForeignKey(Meals, on_delete=models.CASCADE, related_name='snack_diets',db_column='id_snack', blank=True, null=True)
    id_dinner = models.ForeignKey(Meals, on_delete=models.CASCADE, related_name='dinner_diets',db_column='id_dinner', blank=True, null=True)
    id_dessert = models.ForeignKey(Meals, on_delete=models.CASCADE, related_name='dessert_diets',db_column='id_dessert', blank=True, null=True)
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)
    name_diet = models.CharField(max_length=255)
    allergens = models.JSONField()
    isactive = models.IntegerField()
    healthy_scale = models.IntegerField()
    calories = models.IntegerField()
    days = models.JSONField()
    description = models.CharField(max_length=255)

    class Meta:
        db_table = 'diets'
