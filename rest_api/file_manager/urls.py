from django.urls import path, include

from .views import file

urlpatterns = [
    path('documents/<str:name>/<int:revision>', file, name="file"),
]