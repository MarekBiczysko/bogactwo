import json
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
    print(f'fetching currencies from {GET_MARKETS_URL}')
    timestamp = datetime.now()

    response = requests.get(GET_MARKETS_URL)
    data = response.json()

    try:
        is_success = data['success']

    except KeyError:
        print('Get currencies fetch error')
        return

    if is_success:
        fetched_currencies = {
            entry['MarketCurrency']: entry['MarketCurrencyLong']
            for entry in data['result']
            if entry['MarketName'].startswith('USD-')
        }
    else:
        print('Get currencies fetch success==false: ', data)
        return

    available_currencies = AvailableCurrencies.objects.first()

    if available_currencies:
        available_currencies.currencies = fetched_currencies
        available_currencies.updated = timestamp
        available_currencies.save()
    else:
        AvailableCurrencies.objects.create(
            currencies = fetched_currencies
        )

    get_available_currencies.counter += 1
    if get_available_currencies.counter == 3:
        task = PeriodicTask.objects.get(name='get_currencies')
        task.enabled = False
        task.save()

get_available_currencies.counter  = 0


@app.task()
def get_currency_data(currency):
    url = GET_CURRENCY_DATA_URL + currency

    print(f'fetching currency data from {url}')

    response = requests.get(url)
    data = response.json()

    try:
        is_success = data['success']

    except KeyError:
        print('Get currency data fetch error')
        return

    if is_success:
        result = data['result'][0]

        CurrencyData.objects.create(
            name=currency,
            market_name=result['MarketName'],
            high=result['High'],
            low=result['Low'],
            last=result['Last'],
            timestamp=result['TimeStamp'],
        )
    else:
        print('Get currency data fetch success==false: ', data)
        return
