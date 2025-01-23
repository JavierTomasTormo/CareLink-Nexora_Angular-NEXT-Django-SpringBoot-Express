from django.db import models

class Activity(models.Model):
    name_activitie = models.CharField(max_length=255)
    id_hour = models.ForeignKey('hour.Hour', on_delete=models.CASCADE, related_name='activities_by_hour', db_column='id_hour', blank=True, null=True)
    id_day = models.ForeignKey('day.Day', on_delete=models.CASCADE, related_name='activities_by_day', db_column='id_day', blank=True, null=True)
    id_month = models.ForeignKey('month.Month', on_delete=models.CASCADE, related_name='activities_by_month', db_column='id_month', blank=True, null=True)
    id_year = models.ForeignKey('year.Year', on_delete=models.CASCADE, related_name='activities_by_year', db_column='id_year', blank=True, null=True)
    id_dayoftheweek = models.ForeignKey('daysofweek.Dayofweek', on_delete=models.CASCADE, related_name='activities_by_dayoftheweek', db_column='id_dayoftheweek', blank=True, null=True)
    description = models.CharField(max_length=255)
    isactive = models.IntegerField(default=0)
    slug = models.SlugField(unique=True)
    intensity = models.IntegerField(choices=[(i, str(i)) for i in range(11)])
    price = models.DecimalField(max_digits=10, decimal_places=2)
    caracteristics = models.JSONField(default=dict)
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)
    max_participants = models.IntegerField()
    capacity = models.IntegerField()
    duration = models.IntegerField()  # Duration in minutes

    class Meta:
        ordering = ['-createdat']
        db_table = 'activities'

    def __str__(self):
        return self.name_activitie
