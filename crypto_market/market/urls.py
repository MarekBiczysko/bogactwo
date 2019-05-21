from django.urls import path
from .views import CurrencyDataView, CurrencyDataItemView, UserSettingsView, StartTaskView, AvailableCurrenciesView


urlpatterns = [
    path('currency_data/', CurrencyDataView.as_view()),
    path('currency_data/<int:pk>/', CurrencyDataItemView.as_view()),
    path('currencies/', AvailableCurrenciesView.as_view()),
    path('user_settings/<int:pk>/', UserSettingsView.as_view()),
    path('start_task/', StartTaskView.as_view())
]

