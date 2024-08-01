from __future__ import annotations

from typing import TYPE_CHECKING, Any

from django import http
from django.core import exceptions
from rest_framework import exceptions as drf_exc
from rest_framework import response, views

from app.enums import JSendStatuses

if TYPE_CHECKING:
    from collections.abc import Mapping


class ExceptionHandler:
    def handle(self, exception: Exception) -> response.Response | None:
        exception = {
            http.Http404: lambda: drf_exc.NotFound(*exception.args),
            exceptions.PermissionDenied: lambda: drf_exc.PermissionDenied(
                *exception.args
            ),
        }.get(exception.__class__, lambda: exception)()

        if isinstance(exception, drf_exc.APIException):
            return self.__handle_api_exc(exception)

        return None

    def __handle_api_exc(self, exception: drf_exc.APIException) -> response.Response:
        headers = self.__enrich_auth_header({}, exception)
        headers = self.__enrich_retry_header(headers, exception)

        views.set_rollback()
        return response.Response(
            self.__make_response_data(exception),
            status=exception.status_code,
            headers=headers,
        )

    def __enrich_auth_header(
        self, headers: dict[str, str], exception: drf_exc.APIException
    ) -> dict[str, str]:
        headers_copy = headers.copy()
        del headers

        if getattr(exception, "auth_header", None):
            headers_copy["WWW-Authenticate"] = getattr(exception, "auth_header")

        return headers_copy

    def __enrich_retry_header(
        self, headers: dict[str, str], exception: drf_exc.APIException
    ) -> dict[str, str]:
        headers_copy = headers.copy()
        del headers

        if getattr(exception, "wait", None):
            headers_copy["Retry-After"] = f"{getattr(exception, "wait")}"

        return headers_copy

    def __make_response_data(
        self, exception: drf_exc.APIException
    ) -> Mapping[str, Any]:
        if isinstance(exception.detail, list | dict):
            return {
                "status": JSendStatuses.from_http(exception.status_code),
                "message": exception.default_detail,
                "data": exception.detail,
            }

        return {
            "status": JSendStatuses.from_http(exception.status_code),
            "message": exception.detail,
        }


def exception_handler(exc: Exception, context: Any) -> response.Response | None:
    del context
    return ExceptionHandler().handle(exc)
