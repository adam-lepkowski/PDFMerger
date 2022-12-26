from django.test import TestCase

from merger.views import IndexView


class TestIndex(TestCase):

    def test_index_get(self):
        response = self.client.get("/")
        self.assertEqual(200, response.status_code)

    def test_index_get_template(self):
        response = self.client.get("/")
        self.assertTemplateUsed(response, "merger/index.html")

    def test_index_get_view(self):
        response = self.client.get("/")
        self.assertEqual(response.resolver_match.func.view_class, IndexView)
