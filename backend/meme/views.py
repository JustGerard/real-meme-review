from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from meme.models import Ranking, Video
from meme.serializers import RankingSerializer, VideoSerializer


class RankingViewSet(viewsets.ModelViewSet):
    serializer_class = RankingSerializer
    queryset = Ranking.objects.all().order_by('position')

    def list(self, request, **kwargs):
        queryset = Ranking.objects.all().order_by('position')
        serializer = RankingSerializer(queryset, many=True)
        # return JsonResponse(serializer.data, safe=False)
        return Response(serializer.data)


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all().order_by('quality')
    serializer_class = VideoSerializer

    @action(detail=True, methods=['post'])
    def update_video(self, request, pk=None):
        video = self.get_object()
        serializer = VideoSerializer(data=request.data)

        if serializer.is_valid():
            tmp = 1
            video.quality = (video.quality * video.views + tmp) / (video.views + 1)
            video.views = video.views + 1
            video.save()
            return Response({'status': 'video updated'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
