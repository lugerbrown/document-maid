from django.db import models


class File(models.Model):
    name = models.CharField(max_length=1000)
    revision = models.IntegerField()
    file_guid = models.CharField(max_length=1000)

    def __str__(self):
        return self.name