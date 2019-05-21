from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from jsonfield import JSONField
from django.contrib.auth.models import User

# Create your models here.
from rest_framework.exceptions import ValidationError


class CurrencyData(models.Model):
    currency            = models.CharField(max_length=20, unique=True)
    currency_long_name  = models.CharField(max_length=50, blank=True, null=True)
    value               = models.IntegerField()
    timestamp           = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.timestamp} | {self.value} {self.currency} {self.currency_long_name}'


class AvailableCurrencies(models.Model):
    currencies  = JSONField()
    updated   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'AvailableCurrencies | {self.updated}'

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        print('SAVING AvailableCurrencies')
        super().save(force_insert=False, force_update=False, using=None,
             update_fields=None)


@receiver(pre_save, sender=AvailableCurrencies)
def allow_only_one_instance(sender, instance, *args, **kwargs):
    print('allow_only_one_instance signal')
    if AvailableCurrencies.objects.exclude(pk=instance.pk).exists():
        raise ValidationError('A AvailableCurrencies object already exists')


@receiver(post_save, sender=AvailableCurrencies)
def broadcast_available_currencies(sender, instance, *args, **kwargs):
    from channels.layers import get_channel_layer
    channel_layer = get_channel_layer()
    from asgiref.sync import async_to_sync

    print('broadcast_available_currencies signal')
    print('channel layer: ', channel_layer)

    async_to_sync(channel_layer.group_send)(
        "currency_list",
        {
            "type": "currency_list_update",
            "currency_list": instance.currencies,
        }
    )


class UserSettings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    settings = JSONField()
