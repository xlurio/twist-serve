# Generated by Django 5.0.7 on 2024-08-02 15:32

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("matches", "0002_alter_matchgame_player1_points_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="match",
            options={
                "ordering": ("-date",),
                "verbose_name": "match",
                "verbose_name_plural": "matches",
            },
        ),
    ]
