import json

from django.db import models
from django.utils import timezone


class Video(models.Model):
    url = models.CharField(max_length=200)
    quality = models.FloatField()
    views = models.BigIntegerField()
    date = models.DateTimeField(default=timezone.now)

    @property
    def to_dict(self):
        data = {
            'url': json.loads(self.url),
            'date': self.date,
            'quality': self.quality,
            'views': self.views
        }
        return data

    def __str__(self):
        return self.url


class Ranking(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    position = models.BigIntegerField()
