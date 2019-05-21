from django.contrib import admin

# Register your models here.


from .models import CurrencyData, UserSettings

admin.site.register(CurrencyData)
admin.site.register(UserSettings)
