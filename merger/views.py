from django.shortcuts import render
from django.views import View


class IndexView(View):
    """
    Represent main page.
    """

    def get(self, request):
        """
        Display main page.
        """
        return render(request, "merger/index.html")