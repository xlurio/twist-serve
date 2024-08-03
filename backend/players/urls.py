from rest_framework import routers

from players.views import PlayerViewSet

router = routers.SimpleRouter()
router.register(r"", PlayerViewSet)

urlpatterns = router.urls
