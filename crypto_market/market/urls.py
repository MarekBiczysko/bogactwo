from django.urls import path
from .views import (
    CurrencyDataView,
    CurrencyDataItemView,
    UserSettingsView,
    StartFetchAvailableCurrencies,
    StartFetchCurrencyData,
    AvailableCurrenciesView
)


urlpatterns = [
    path('currency_data/', CurrencyDataView.as_view()),
    path('currency_data/<int:pk>/', CurrencyDataItemView.as_view()),
    path('currencies/', AvailableCurrenciesView.as_view()),
    path('start_curr_list/', StartFetchAvailableCurrencies.as_view()),
    path('start_curr_data/<str:curr>/', StartFetchCurrencyData.as_view()),
    path('user_settings/', UserSettingsView.as_view())
]

