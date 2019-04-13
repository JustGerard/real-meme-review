from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response

from meme.models import Ranking, Video
from meme.serializers import RankingSerializer, VideoSerializer


class RankingViewSet(viewsets.ModelViewSet):
    serializer_class = RankingSerializer
    queryset = Ranking.objects.all().order_by('position')

    def list(self, request, **kwargs):
        queryset = Ranking.objects.all().order_by('position')  # [:10]
        # urls: List[str] = []
        # if len(queryset) is not 0:
        #     urls = [video.video.url for video in queryset]
        #     urls = [url.split('watch?v=')[-1] for url in urls]
        #     urls = JsonResponse(urls, safe=False)
        #
        # serializer = RankingSerializer(urls, many=True)
        serializer = RankingSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)
        # return Response(serializer.data)


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all().order_by('quality')
    serializer_class = VideoSerializer
