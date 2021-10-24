from django.urls import path

from .views import file, files_list, single_file_handler

urlpatterns = [
    path('documents/<str:name>/<int:revision>', file, name="file"),
    path('documents/<str:name>', single_file_handler, name="single_file_handler"),
    path('documents', files_list, name="file_list"),
]