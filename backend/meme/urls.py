from django.urls import include, path
from rest_framework import routers

from meme import views

router = routers.DefaultRouter()
router.register(r'ranking', views.RankingViewSet)
router.register(r'videos', views.VideoViewSet)

urlpatterns = [
    path('', include(router.urls))
]
