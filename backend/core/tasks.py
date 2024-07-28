from __future__ import annotations

from typing import TYPE_CHECKING

import celery

if TYPE_CHECKING:
    from collections.abc import Mapping
    from typing import Any

    from django.core.files.uploadedfile import UploadedFile
    from django.db.models.fields.files import FieldFile


@celery.shared_task
def save_file_to_file_field(
    pickled_file_field: bytes, pickled_file: bytes
) -> Mapping[str, Any]:
    try:
        import pickle

        file_field: FieldFile = pickle.loads(pickled_file_field)
        file: UploadedFile = pickle.loads(pickled_file)

        file_field.save(file.name or "file", file)

        return {
            "status": "success",
            "data": {"file_field": repr(file_field), "file": repr(file)},
        }

    except Exception as exception:
        return {
            "status": "error",
            "message": str(exception),
            "data": {"file_field": repr(file_field), "file": repr(file)},
        }
