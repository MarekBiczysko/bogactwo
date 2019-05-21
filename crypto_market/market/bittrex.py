import json
from datetime import datetime
import requests
from django_celery_beat.models import PeriodicTask

from crypto_market.celery import app
from . models import AvailableCurrencies

MAIN_API_URL = 'https://api.bittrex.com/api/v1.1/public/'
GET_CURRENCIES_URL = MAIN_API_URL + 'getcurrencies'


@app.task()
def get_available_currencies(currency):
    print(f'fetching currencies from {GET_CURRENCIES_URL}, kwarg: {currency}')
    timestamp = datetime.now()

    response = requests.get(GET_CURRENCIES_URL)
    data = response.json()

    try:
        is_success = data['success']

    except KeyError:
        print('Get currencies fetch error')
        return

    if is_success:
        fetched_currencies = {entry['Currency']: entry['CurrencyLong'] for entry in data['result']}
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
