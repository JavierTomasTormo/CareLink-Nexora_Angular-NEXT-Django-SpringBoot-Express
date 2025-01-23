from django.db import models
from vitalnest.usertype.user.models import User
from vitalnest.payments.inscription.models import Inscription
from vitalnest.payments.payment.models import Payment

class Cancelation(models.Model):
    id_inscription = models.ForeignKey(Inscription, on_delete=models.CASCADE, related_name='cancelations', db_column='id_inscription', blank=True, null=True)
    id_payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='cancelations', db_column='id_payment', blank=True, null=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cancelations', db_column='id_user', blank=True, null=True)
    email = models.EmailField(max_length=255)
    state = models.CharField(max_length=50)
    transaction_reference = models.CharField(max_length=255)
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'cancelations'
