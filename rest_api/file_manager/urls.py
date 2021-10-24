from django.urls import path

from .views import file, files_list, files_revisions

urlpatterns = [
    path('documents/<str:name>/<int:revision>', file, name="file"),
    path('documents/<str:name>', files_revisions, name="file_revisions"),
    path('documents', files_list, name="file_list"),
]