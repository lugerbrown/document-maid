import uuid
from django.db import models
from django.contrib.auth.models import User


class File(models.Model):
    def file_blob_destination(self, filename):
        return f"storage/documents/{str(self.id)}"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=1000)
    revision = models.IntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    blob = models.FileField(upload_to=file_blob_destination)

    def __str__(self):
        return self.name


