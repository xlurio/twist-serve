from __future__ import annotations

import enum


class JSendStatuses(enum.StrEnum):
    SUCCESS = "success"
    FAIL = "fail"
    ERROR = "error"

    @classmethod
    def from_http(cls, status_code: int) -> JSendStatuses:
        is_client_error = 400 <= status_code < 500

        if is_client_error:
            return JSendStatuses.FAIL

        return cls._non_fail_from_http(status_code)

    @classmethod
    def _non_fail_from_http(cls, status_code: int) -> JSendStatuses:
        is_server_error = 500 <= status_code < 600

        if is_server_error:
            return JSendStatuses.ERROR

        return JSendStatuses.SUCCESS
