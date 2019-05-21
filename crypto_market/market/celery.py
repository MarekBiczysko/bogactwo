import datetime

from django_celery_beat.models import PeriodicTask, IntervalSchedule
import json

def start_fetch_available_currencies():
    schedule, created = IntervalSchedule.objects.get_or_create(
        every=10,
        period=IntervalSchedule.SECONDS,
    )


    get_currencies, created = PeriodicTask.objects.get_or_create(
        interval=schedule,  # we created this above.
        name='get_currencies',  # simply describes this periodic task.
        task='market.bittrex.get_available_currencies',  # name of task.
        # args=json.dumps(['arg1', 'arg2']),
        kwargs=json.dumps({
            'currency': 'BTN',
        }),
        # expires=datetime.utcnow() + timedelta(seconds=30)
    )

    if not created and get_currencies.enabled is False:
        get_currencies.enabled = True
        get_currencies.save()
