import os
from dotenv import load_dotenv, find_dotenv

from django.shortcuts import render
from django.views import View
from django.http import HttpResponseRedirect, FileResponse
from django.urls import reverse

from .models import PdfModel
from .utils import merge


load_dotenv(find_dotenv())


class IndexView(View):
    """
    Represent main page.
    """

    def get(self, request):
        """
        Display main page.
        """

        context = {
            "error": False,
            "kit": os.environ["FONT_AWESOME"]
        }
        return render(request, "merger/index.html", context)

    def post(self, request):
        """
        Merge sent files and redirect to download page.
        """

        files = [request.FILES[file] for file in request.FILES]
        if len(files) >= 2:
            merged = merge(files)
            pdf = PdfModel(file=merged.getvalue())
            pdf.save()
            merged.close()
            filename = pdf.file.url.split("/")[-1]
            return HttpResponseRedirect(reverse("download", args=[filename]))
        context = {
            "error": True,
            "kit": os.environ["FONT_AWESOME"]
        }
        return render(request, "merger/index.html", context)


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
            "file": file,
            "filename": filename
        }
        return render(request, "merger/download.html", context)

    def post(self, request, filename):
        """
        Serve file.

        Parameters
        ----------
        filename : str
            merged file's name
        """

        name = request.POST["file"]
        file = PdfModel.objects.get(file=name)
        return FileResponse(open(file.file.path, "rb"),
                            as_attachment=True,
                            filename="merged.pdf")
