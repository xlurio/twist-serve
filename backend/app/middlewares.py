from __future__ import annotations

import json
from typing import TYPE_CHECKING, Any

from rest_framework import response as drf_res

from app.enums import JSendStatuses

if TYPE_CHECKING:
    from collections.abc import Callable

    from django.http import HttpRequest, HttpResponse


class JSendMiddleware:
    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]) -> None:
        self.__get_response = get_response

    def __call__(self, request: HttpRequest) -> Any:
        response = self.__get_response(request)
        is_not_info = response.status_code < 200 or response.status_code >= 300

        if not isinstance(response, drf_res.Response) or is_not_info:
            return response

        original_content = {
            "status": JSendStatuses.SUCCESS,
            "data": json.loads(response.content),
        }
        response.content = json.dumps(original_content).encode()

        return response
