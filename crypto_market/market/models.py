from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from jsonfield import JSONField
from django.contrib.auth.models import User

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from rest_framework.exceptions import ValidationError


class CurrencyData(models.Model):
    name        = models.CharField(max_length=20)
    market_name = models.CharField(max_length=20)
    high        = models.FloatField(null=True, blank=True)
    low         = models.FloatField(null=True, blank=True)
    last        = models.FloatField(null=True, blank=True)
    timestamp   = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.timestamp} | {self.name} {self.last}'


@receiver(post_save, sender=CurrencyData)
def broadcast_currency_data(sender, instance, *args, **kwargs):
    channel_layer = get_channel_layer()
    print('broadcast_currency_data signal')
    print('channel layer: ', channel_layer)

    group = f'currency_data_{instance.name}'

    async_to_sync(channel_layer.group_send)(
        group,
        {
            "type": "currency_data_update",
            "name": instance.name,
            "market_name": instance.market_name,
            "high": instance.high,
            "low": instance.low,
            "last": instance.last,
            "timestamp": instance.timestamp,
        }
    )


class AvailableCurrencies(models.Model):
    currencies  = JSONField()
    updated   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'AvailableCurrencies | {self.updated}'


@receiver(pre_save, sender=AvailableCurrencies)
def allow_only_one_instance(sender, instance, *args, **kwargs):
    if AvailableCurrencies.objects.exclude(pk=instance.pk).exists():
        raise ValidationError('A AvailableCurrencies object already exists')


@receiver(post_save, sender=AvailableCurrencies)
def broadcast_available_currencies(sender, instance, *args, **kwargs):
    channel_layer = get_channel_layer()
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
