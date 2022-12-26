from django.shortcuts import render
from django.views import View
from django.core.files.base import ContentFile

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
        return render(request, "merger/index.html")
