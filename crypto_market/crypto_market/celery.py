# celery -A crypto_market worker --beat --scheduler django --loglevel=info

import os
from celery import Celery
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "crypto_market.settings")

app = Celery('crypto_market', broker='redis://127.0.0.1:6379')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

