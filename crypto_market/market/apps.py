from django.apps import AppConfig

# from market.celery import add_task


class MarketConfig(AppConfig):
    name = 'market'
    def ready(self):
        print('Market ready')
        # add_task()
