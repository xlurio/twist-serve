from rest_framework import routers

from tournaments.views import TournamentViewSet

router = routers.SimpleRouter()
router.register(r"", TournamentViewSet)

urlpatterns = router.urls
