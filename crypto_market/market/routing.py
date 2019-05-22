from django.urls import path

from .consumers import CurrencyDataConsumer, CurrencyListConsumer


websocket_urls_patterns = [
    path('ws/currency_data/<str:curr>', CurrencyDataConsumer),
    path('ws/currency_list', CurrencyListConsumer)
]
