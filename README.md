# bogactwo

/crypto_market_frontend yarn start


redis-server &
celery -A crypto_market worker --beat --scheduler django --loglevel=info

python3 manage.py runserver