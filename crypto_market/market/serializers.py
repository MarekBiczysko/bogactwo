from rest_framework import serializers
from .models import CurrencyData, UserSettings, AvailableCurrencies


class CurrencyDataSerializer(serializers.ModelSerializer):

    def validate_value(self, obj):
        obj = float(obj)
        return obj

    class Meta:
        model = CurrencyData
        fields = '__all__'

class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = '__all__'


class AvailableCurrenciesSerializer(serializers.ModelSerializer):

    class Meta:
        model = AvailableCurrencies
        fields = '__all__'
