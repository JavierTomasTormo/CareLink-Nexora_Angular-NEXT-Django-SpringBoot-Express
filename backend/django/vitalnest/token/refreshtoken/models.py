from django.db import models
from vitalnest.usertype.user.models import User

class RefreshToken(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='refreshtoken', db_column='id_user', blank=True, null=True)
    email = models.EmailField(max_length=255)
    refresh_token = models.CharField(max_length=255)
    expires_at = models.CharField(max_length=255)
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)


    class Meta:
        db_table = 'refreshtoken'

    def __str__(self):
        return self.email