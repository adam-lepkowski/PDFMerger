from django.shortcuts import render
from django.views import View
from django.http import HttpResponseRedirect
from django.urls import reverse

from .models import PdfModel
from .utils import merge


class IndexView(View):
    """
    Represent main page.
    """

    def get(self, request):
        """
        Display main page.
        """

        return render(request, "merger/index.html")

    def post(self, request):
        """
        Merge sent files and redirect to download page.
        """

        files = [request.FILES[file] for file in request.FILES]
        merged = merge(files)
        pdf = PdfModel(file=merged.getvalue())
        pdf.save()
        merged.close()
        filename = pdf.file.url.split("/")[-1]
        return HttpResponseRedirect(reverse("download", args=[filename]))


class DownloadView(View):
    """
    Display download page.
    """
    
    def get(self, request, filename):
        """
        Render download page.

        Parameters
        ----------
        filename : str
            merged file's name
        """

        file = PdfModel.objects.get(file__endswith=str(filename))
        context = {
            "file": file
        }
        return render(request, "merger/download.html", context)