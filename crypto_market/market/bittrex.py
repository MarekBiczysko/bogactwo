from datetime import datetime
import requests
from django_celery_beat.models import PeriodicTask

from crypto_market.celery import app
from .models import AvailableCurrencies, CurrencyData

MAIN_API_URL = 'https://api.bittrex.com/api/v1.1/public/'
GET_CURRENCIES_URL = MAIN_API_URL + 'getcurrencies'
GET_MARKETS_URL = MAIN_API_URL + 'getmarkets'
GET_CURRENCY_DATA_URL = MAIN_API_URL + 'getmarketsummary?market=usd-'

@app.task()
def get_available_currencies():
    timestamp = datetime.now()

    response = requests.get(GET_MARKETS_URL)
    data = response.json()

    try:
        is_success = data['success']

    except KeyError:
        print('Get available currencies bittrex api fetch error')
        return

    fetched_currencies = {
        entry['MarketCurrency']: entry['MarketCurrencyLong']
        for entry in data['result']
        if entry['MarketName'].startswith('USD-')
    }

    available_currencies = AvailableCurrencies.objects.first()

    if available_currencies:
        available_currencies.currencies = fetched_currencies
        available_currencies.updated = timestamp
        available_currencies.save()
    else:
        AvailableCurrencies.objects.create(
            currencies = fetched_currencies
        )

@app.task()
def get_currency_data(*args, currency):
    url = GET_CURRENCY_DATA_URL + currency

    #  disable task when no client is waiting for data
    task = PeriodicTask.objects.get(name=f'get_currency_data_{currency}')
    if not args:
        task.enabled = False
        task.save()
        return

    response = requests.get(url)
    data = response.json()

    try:
        is_success = data['success']

    except KeyError:
        print('Get currency data bittrex api fetch error')
        return

    result = data['result'][0]

    CurrencyData.objects.update_or_create(
        name=currency,
        market_name=result['MarketName'],
        defaults={
            'high': result['High'],
            'low': result['Low'],
            'last': result['Last'],
            'timestamp': result['TimeStamp'],
        }
    )
