from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json


class CurrencyDataConsumer(WebsocketConsumer):
    def connect(self):
        self.currency = self.scope['url_route']['kwargs']['curr']
        self.room_group_name = f'currency_data_{self.currency}'
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

    def currency_data_update(self, event):
        print('CurrencyDataConsumer currency_data_update', )
        name = event['name']
        market_name = event['market_name']
        high = event['high']
        low = event['low']
        last = event['last']
        timestamp = event['timestamp']

        self.send(text_data=json.dumps(
            {
                'name': name,
                'market_name': market_name,
                'high': high,
                'low': low,
                'last': last,
                'timestamp': timestamp,
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

    def currency_list_update(self, event):
        print('CurrencyListConsumer currency_list_update',)
        currency_list = event['currency_list']

        self.send(text_data=json.dumps(
            {
                'currency_list': currency_list,
            }
        ))
