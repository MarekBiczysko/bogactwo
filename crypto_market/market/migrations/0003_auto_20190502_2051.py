# Generated by Django 2.2.1 on 2019-05-02 20:51

from django.db import migrations, models
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0002_usersettings'),
    ]

    operations = [
        migrations.CreateModel(
            name='AvailableCurrencies',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currencies', jsonfield.fields.JSONField()),
                ('updated', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='currencydata',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
