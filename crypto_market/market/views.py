from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from rest_framework import generics, permissions
from rest_framework.views import APIView

from market.celery import start_fetch_available_currencies, start_fetch_currency_data
from .models import CurrencyData, UserSettings, AvailableCurrencies
from .serializers import CurrencyDataSerializer, UserSettingsSerializer, AvailableCurrenciesSerializer


# Create your views here.


class CurrencyDataView(generics.ListCreateAPIView):
    queryset = CurrencyData.objects.all()
    serializer_class = CurrencyDataSerializer


class CurrencyDataItemView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CurrencyData.objects.all()
    serializer_class = CurrencyDataSerializer


class AvailableCurrenciesView(generics.ListCreateAPIView):
    queryset = AvailableCurrencies.objects.all()
    serializer_class = AvailableCurrenciesSerializer


class UserSettingsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserSettings
    serializer_class = UserSettingsSerializer


class StartFetchAvailableCurrencies(APIView):
    def get(self, request, *args, **kwargs):
        print('\n\n!!\n', request.user)
        print('\n\n!!\n', request.META)
        print('StartFetchAvailableCurrencies')
        start_fetch_available_currencies()
        return HttpResponse('Hello, YEAH!')

class StartFetchCurrencyData(APIView):
    def get(self, request, *args, **kwargs):
        # print('\n\n!!\n', request.user)
        # print('\n\n!!\n', request.META)
        currency = kwargs.get('curr')
        print('StartFetchCurrencyData', currency)
        start_fetch_currency_data(currency)
        return HttpResponse(f'Hello, YEAH! {currency}')
