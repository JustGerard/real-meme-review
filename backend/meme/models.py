from django.db import models


class Video(models.Model):
    url = models.CharField(max_length=200, primary_key=True)
    quality = models.FloatField(blank=True, default=0.0)
    views = models.IntegerField(blank=True, default=0)
    length = models.IntegerField()

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
