# Generated by Django 4.2 on 2023-05-08 23:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fstorage', '0005_alter_user_file_comment_alter_user_file_unique_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='user_file',
            name='ext',
            field=models.CharField(default='zip', max_length=70),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user_file',
            name='size',
            field=models.DecimalField(decimal_places=12, max_digits=19),
        ),
    ]
