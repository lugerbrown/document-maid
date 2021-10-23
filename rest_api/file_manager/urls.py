from django.urls import path, include

from .views import file, files_list

urlpatterns = [
    path('documents/<str:name>/<int:revision>', file, name="file"),
    path('documents', files_list, name="file_list"),
]