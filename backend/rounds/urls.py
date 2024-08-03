from django.urls import path

from rounds.views import RoundListAPIView

urlpatterns = [path("", RoundListAPIView.as_view())]
