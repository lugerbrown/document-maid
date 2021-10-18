from django.http import HttpResponse
from rest_framework import status
from rest_framework.parsers import FileUploadParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import File
from .serializers import FileSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def files(request):
    snippets = File.objects.all()
    serializer = FileSerializer(snippets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def file(request, name, revision):
    try:
        file_record: File = File.objects.get(owner=request.user.id, name=name, revision=revision)
    except File.DoesNotExist:
        file_record = None

    if file_record is None:
        return Response(status=status.HTTP_404_NOT_FOUND)

    filename = file_record.id
    file_path = f"storage/documents/{filename}"
    file_pointer = open(file_path, "rb")
    response = HttpResponse(file_pointer, content_type='application/octet-stream')
    response['Content-Disposition'] = f"attachment; filename={file_record.name}"
    response['Content-Transfer-Encoding'] = 'base64'
    return response

