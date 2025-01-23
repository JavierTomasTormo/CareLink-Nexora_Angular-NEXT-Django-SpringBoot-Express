from django.db import models
from vitalnest.usertype.user.models import User
from vitalnest.roles.role.models import Role

class UserRole(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userrole', db_column='id_user', blank=True, null=True)
    id_role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='userrole', db_column='id_role', blank=True, null=True)

    class Meta:
        db_table = 'userrole'
