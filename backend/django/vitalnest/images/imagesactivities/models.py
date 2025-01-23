from django.db import models
from vitalnest.images.images.models import Images
from vitalnest.activities.models import Activity

class ImagesActivities(models.Model):
    id_img = models.ForeignKey(Images, on_delete=models.CASCADE, related_name='activity_images',db_column='id_img', blank=True, null=True)
    id_activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='images',db_column='id_activity', blank=True, null=True)
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'imagesactivities'
