from django.db import models


class Video(models.Model):
    url = models.CharField(max_length=200)
    quality = models.FloatField()
    views = models.BigIntegerField()


class Ranking(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    position = models.BigIntegerField()

