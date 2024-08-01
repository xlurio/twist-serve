from rest_framework import pagination


class CustomPageNumberPagination(pagination.PageNumberPagination):
    page_size_query_param = "page_size"
    max_page_size = 25
