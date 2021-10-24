from django.http import HttpResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import FileSerializer
from .forms import UploadFileForm
from .models import File
from django.contrib.auth.models import User


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def file(request, name, revision):
    if request.method == 'GET':
        return retrieve_file(name, request, revision)
    if request.method == 'POST':
        return save_new_file(name, request, revision)


@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def files_revisions(request, name):
    if request.method == 'GET':
        return get_file_revisions(name, request)
    if request.method == 'DELETE':
        return delete_file(name, request)


def delete_file(id, request):
    try:
        user = User.objects.get(id=request.user.id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    try:
        file_record: File = File.objects.get(owner=request.user.id, id=id)
    except File.DoesNotExist:
        file_record = None
    if file_record is None:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    file_record.delete()
    return Response(status=status.HTTP_202_ACCEPTED)


def get_file_revisions(name, request):
    try:
        documents = File.objects.filter(owner=request.user.id, name=name)
    except File.DoesNotExist:
        documents = None
    if documents is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = FileSerializer(documents, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def files_list(request):
    try:
        documents = File.objects.filter(owner=request.user.id)
    except File.DoesNotExist:
        documents = None

    if documents is None:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = FileSerializer(documents, many=True)
    return Response(serializer.data)


def save_new_file(name, request, revision):
    form = UploadFileForm(request.POST, request.FILES)
    if form.is_valid():
        try:
            user = User.objects.get(id=request.user.id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            file_record: File = File.objects.get(owner=request.user.id, name=name, revision=revision)
        except File.DoesNotExist:
            file_record = None
        if file_record is not None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        instance = File(
            blob=request.FILES.get('file_uploaded'),
            name=name,
            revision=revision,
            owner=user)
        instance.save()
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


def retrieve_file(name, request, revision):
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

