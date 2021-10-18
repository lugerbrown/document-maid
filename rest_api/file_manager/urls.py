from django.urls import path
from .views import files, file, create


urlpatterns = [
    path('documents/', files, name="files"),
    path('documents/<str:name>/<int:revision>', file, name="file")
]