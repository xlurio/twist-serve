# Generated by Django 5.0.7 on 2024-08-03 01:25

from django.db import migrations, models

import tournaments.models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Tournament",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(default=True, verbose_name="is active"),
                ),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="created at"),
                ),
                (
                    "modified_at",
                    models.DateTimeField(auto_now=True, verbose_name="modified at"),
                ),
                ("name", models.TextField(verbose_name="name")),
                (
                    "avatar",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=tournaments.models._get_tournament_avatar_dest_path,
                        verbose_name="avatar",
                    ),
                ),
                ("country", models.TextField(verbose_name="country")),
                ("state_province", models.TextField(verbose_name="state/province")),
                ("city", models.TextField(verbose_name="city")),
                (
                    "neighborhood",
                    models.TextField(
                        blank=True, null=True, verbose_name="neighborhood"
                    ),
                ),
                ("street", models.TextField(verbose_name="street")),
                (
                    "building_number",
                    models.PositiveIntegerField(
                        blank=True, null=True, verbose_name="building number"
                    ),
                ),
                (
                    "complement",
                    models.TextField(blank=True, null=True, verbose_name="complement"),
                ),
                ("instalation", models.TextField(verbose_name="instalation")),
                ("start_date", models.DateField(verbose_name="start date")),
                ("end_date", models.DateField(verbose_name="end date")),
                (
                    "surface",
                    models.CharField(
                        choices=[
                            ("clay", "clay"),
                            ("grass", "grass"),
                            ("hard", "hard"),
                        ],
                        max_length=6,
                        verbose_name="surface",
                    ),
                ),
            ],
            options={
                "verbose_name": "tournament",
                "verbose_name_plural": "tournaments",
                "ordering": ("-start_date",),
            },
        ),
    ]
