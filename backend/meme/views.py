from rest_framework import viewsets

from meme.models import Ranking, Video
from meme.serializers import RankingSerializer, VideoSerializer


class RankingViewSet(viewsets.ModelViewSet):
    queryset = Ranking.objects.all().order_by('position')
    serializer_class = RankingSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all().order_by('quality')
    serializer_class = VideoSerializer
