from django.db import models
from vitalnest.usertype.user.models import User

class Payment(models.Model):
    id_inscription = models.ForeignKey('inscription.Inscription', on_delete=models.CASCADE, related_name='payments', db_column='id_inscription', blank=True, null=True)
    email = models.EmailField(max_length=255)
    card_number = models.CharField(max_length=255)
    card_date = models.CharField(max_length=255)
    ccv = models.CharField(max_length=255)
    state = models.CharField(max_length=50)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments', db_column='id_user', blank=True, null=True)
    payment_method = models.CharField(max_length=50)
    transaction_reference = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    isactive = models.IntegerField()
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'payments'
