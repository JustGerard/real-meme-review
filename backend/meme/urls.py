from django.urls import include, path
from rest_framework import routers

from meme import views

router = routers.DefaultRouter()
router.register(r'ranking', views.RankingViewSet, basename='ranking')
router.register(r'insert', views.VideoViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    # path('insert/<int:pk>/', views.VideoViewSet.partial_update)
]
