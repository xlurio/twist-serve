from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

authentication_urlpatterns = (
    [
        path("", include("players.urls")),
        path("accounts/", include("accounts.urls")),
        path("matches/", include("matches.urls")),
        path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
        path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
        path("tournaments/", include("tournaments.urls")),
    ],
    "v1",
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(authentication_urlpatterns)),  # type: ignore [arg-type]
]
