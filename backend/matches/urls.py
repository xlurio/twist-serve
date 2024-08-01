from django.urls import path

from matches.views import MatchListAPIView

urlpatterns = [path("", MatchListAPIView.as_view())]
