import factory
from django.conf import settings
from factory import django


class UserFactory(django.DjangoModelFactory):
    class Meta:
        model = settings.AUTH_USER_MODEL

    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    email = factory.Faker("free_email")
