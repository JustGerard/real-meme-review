# Generated by Django 2.1.7 on 2019-04-13 18:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ranking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.IntegerField()),
            ],
            options={
                'ordering': ('position',),
            },
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=200)),
                ('quality', models.FloatField(blank=True, default=0.0)),
                ('views', models.IntegerField(blank=True, default=0)),
                ('length', models.IntegerField()),
            ],
            options={
                'ordering': ('quality',),
            },
        ),
        migrations.AddField(
            model_name='ranking',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='meme.Video'),
        ),
    ]
