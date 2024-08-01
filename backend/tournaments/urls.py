from django.urls import path

from tournaments.views import TournamentListAPIView

urlpatterns = [path("", TournamentListAPIView.as_view())]
