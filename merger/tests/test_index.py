from io import BytesIO
from unittest.mock import patch, call, MagicMock

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

    @patch("merger.views.PdfModel", autospec=True)
    @patch("merger.views.merge", return_value=BytesIO(b"merged_content"))
    def test_index_post(self, merge_mock, pdfmodel_mock):
        uploaded_file = BytesIO(b"uploaded_content")
        response = self.client.post("/", {"file-upload": uploaded_file})
        merge_mock.assert_called_once()
        self.assertTrue(call().save() in pdfmodel_mock.method_calls)
        self.assertTrue(302, response.status_code)
        self.assertTrue(response.url.startswith("/download/"))
        uploaded_file.close()
        merge_mock.return_value.close()