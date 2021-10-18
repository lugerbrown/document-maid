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
    response = {
        'name': name,
        'revision': revision,
        'user': request.user.username,
        'userId': request.user.id
    }
    return Response(response)


