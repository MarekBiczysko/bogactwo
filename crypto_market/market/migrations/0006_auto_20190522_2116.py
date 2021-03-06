# Generated by Django 2.2.1 on 2019-05-22 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0005_auto_20190512_2133'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='currencydata',
            name='currency',
        ),
        migrations.RemoveField(
            model_name='currencydata',
            name='currency_long_name',
        ),
        migrations.RemoveField(
            model_name='currencydata',
            name='value',
        ),
        migrations.AddField(
            model_name='currencydata',
            name='high',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='currencydata',
            name='last',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='currencydata',
            name='low',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='currencydata',
            name='market_name',
            field=models.CharField(default='name', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='currencydata',
            name='name',
            field=models.CharField(default='nname', max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='currencydata',
            name='timestamp',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
