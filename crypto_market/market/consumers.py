from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

from .models import CurrencyData


class CurrencyDataConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'currency'
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        currency = text_data_json['currency']
        value = text_data_json['value']
        id = text_data_json['id']

        # currency_data = CurrencyData.objects.create(
        #     currency=content['currency'],
        #     value=content['value'],
        # )

        currency_data = CurrencyData.objects.get(pk=id)

        currency_data.currency = currency
        currency_data.value = value
        currency_data.save()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'add_currency_data',
                'currency': currency,
                'value': value,
                'id': id,
            }
        )

    def add_currency_data(self, event):
        currency = event['currency']
        value = event['value']
        id = event['id']

        self.send(text_data=json.dumps(
            {
                'currency': currency,
                'value': value,
                'id': id,
            }
        ))


class CurrencyListConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'currency_list'
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        currency = text_data_json['currency']
        value = text_data_json['value']
        id = text_data_json['id']

        # currency_data = CurrencyData.objects.create(
        #     currency=content['currency'],
        #     value=content['value'],
        # )

        currency_data = CurrencyData.objects.get(pk=id)

        currency_data.currency = currency
        currency_data.value = value
        currency_data.save()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'add_currency_data',
                'currency': currency,
                'value': value,
                'id': id,
            }
        )

    def currency_list_update(self, event):
        print('CurrencyListConsumer currency_list_update',)
        currency_list = event['currency_list']

        self.send(text_data=json.dumps(
            {
                'currency_list': currency_list,
            }
        ))
