from django.urls import path

from accounts.views import MeRetrieveAPIView

urlpatterns = [path("me/", MeRetrieveAPIView.as_view())]
