from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView


from market.celery import start_fetch_available_currencies, start_fetch_currency_data
from .models import CurrencyData, UserSettings, AvailableCurrencies
from .serializers import CurrencyDataSerializer, UserSettingsSerializer, AvailableCurrenciesSerializer


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
    queryset = UserSettings.objects.all()
    serializer_class = UserSettingsSerializer

    def get_object(self):
        try:
            return self.get_queryset().get(user=self.request.user)
        except UserSettings.DoesNotExist:
            return None

    def perform_create(self):
        settings_obj, created = self.queryset.update_or_create(
            user=self.request.user,
            defaults={
                'selected': self.request.data['settings']['selected']
                }
        )
        serializer = self.serializer_class(settings_obj, data=self.request.data)
        if serializer.is_valid():
            serializer.save()

        if created:
            return HttpResponse(serializer.data, status.HTTP_201_CREATED)
        else:
            return HttpResponse(serializer.data, status.HTTP_200_OK)


class StartFetchAvailableCurrencies(APIView):
    def get(self, request, *args, **kwargs):
        start_fetch_available_currencies()
        return HttpResponse('Started fetching available currencies')

class StartFetchCurrencyData(APIView):
    def get(self, request, *args, **kwargs):
        currency = kwargs.get('curr')
        username = request.user.username
        start_fetch_currency_data(currency, username)
        return HttpResponse(f'Started fetching data for {currency}')
