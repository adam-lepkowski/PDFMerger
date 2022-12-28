from django.urls import path

from . import views


urlpatterns = [
    path("", views.IndexView.as_view()),
    path("download/", views.DownloadView.as_view(), name="download")
]