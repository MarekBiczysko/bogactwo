import datetime

from django_celery_beat.models import PeriodicTask, IntervalSchedule
import json

def start_fetch_available_currencies():
    schedule, created = IntervalSchedule.objects.get_or_create(
        every=2,
        period=IntervalSchedule.SECONDS,
    )

    get_currencies, created = PeriodicTask.objects.get_or_create(
        interval=schedule,
        name='get_currencies',
        task='market.bittrex.get_available_currencies',
        # expires=datetime.utcnow() + timedelta(seconds=30)
    )

    if not created and get_currencies.enabled is False:
        get_currencies.enabled = True
        get_currencies.save()


def start_fetch_currency_data(currency):
    schedule, created = IntervalSchedule.objects.get_or_create(
        every=2,
        period=IntervalSchedule.SECONDS,
    )

    get_currency_data, created = PeriodicTask.objects.get_or_create(
        interval=schedule,
        name=f'get_currency_data_{currency}',
        task='market.bittrex.get_currency_data',
        # args=json.dumps(['arg1', 'arg2']),
        kwargs=json.dumps({
            'currency': currency,
        }),
        # expires=datetime.utcnow() + timedelta(seconds=30)
    )

    if not created and get_currency_data.enabled is False:
        get_currency_data.enabled = True
        get_currency_data.save()
