from django.urls import path

from . import views


urlpatterns = [
    path("", views.IndexView.as_view()),
    path("download/<str:filename>", views.DownloadView.as_view(), name="download")
]