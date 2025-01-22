from django.db import models
from vitalnest.usertype.user.models import User

class BlackList(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blacklist', db_column='id_user', blank=True, null=True)
    email = models.EmailField(max_length=255)
    token_expired = models.CharField(max_length=255)
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-createdAt']
        db_table = 'blacklist'

    def __str__(self):
        return self.email
