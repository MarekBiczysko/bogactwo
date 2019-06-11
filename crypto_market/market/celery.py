import datetime

from django_celery_beat.models import PeriodicTask, IntervalSchedule
import json

def start_fetch_available_currencies():
    schedule, created = IntervalSchedule.objects.get_or_create(
        every=5,
        period=IntervalSchedule.SECONDS,
    )

    get_currencies, created = PeriodicTask.objects.get_or_create(
        interval=schedule,
        name='get_currencies',
        task='market.bittrex.get_available_currencies',
    )

    if created:
        get_currencies.expires = datetime.datetime.now() + datetime.timedelta(days=30)

    if not created and get_currencies.enabled is False:
        get_currencies.enabled = True

    get_currencies.save()


def start_fetch_currency_data(currency, user):
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
    )

    if created:
        get_currency_data.expires = datetime.datetime.now() + datetime.timedelta(days=30)

    active_users = json.loads(get_currency_data.args)
    if user not in active_users:
        active_users.append(user)
        get_currency_data.args = json.dumps(active_users)

    if not created and get_currency_data.enabled is False:
        get_currency_data.enabled = True

    get_currency_data.save()


def remove_inactive_user_from_tasks(username):
    get_currency_data_qs = PeriodicTask.objects.filter(
        args__contains=username,
    )

    if get_currency_data_qs:
        for task in get_currency_data_qs:
            active_users = json.loads(task.args)
            active_users.remove(username)
            task.args =  json.dumps(active_users)
            task.save()
