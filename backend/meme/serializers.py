from rest_framework import serializers

from meme.models import Video, Ranking


class VideoSerializer(serializers.Serializer):
    url = serializers.CharField(max_length=200)
    quality = serializers.FloatField()
    views = serializers.IntegerField()
    date = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Video.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.quality = validated_data.get('quality', instance.quality)
        instance.views = validated_data.get('views', instance.views)
        instance.save()
        return instance


class RankingSerializer(serializers.Serializer):
    video = VideoSerializer()
    position = serializers.IntegerField()

    def create(self, validated_data):
        return Ranking.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.position = validated_data.get('position', instance.position)
        instance.save()
        return instance
