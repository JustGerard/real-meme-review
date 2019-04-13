from django.db import models
from django.utils import timezone


class Video(models.Model):
    url = models.CharField(max_length=200)
    quality = models.FloatField()
    views = models.IntegerField()
    date = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ('quality',)

    def __str__(self):
        return self.url


class Ranking(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    position = models.IntegerField()

    class Meta:
        ordering = ('position',)

    def __str__(self):
        return self.position
