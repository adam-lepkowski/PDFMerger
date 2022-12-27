from io import BytesIO
from unittest.mock import patch

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

    @patch("merger.views.PdfModel.save")
    @patch("merger.views.merge", return_value=BytesIO(b"merged_content"))
    def test_index_post(self, merge_mock, save_mock):
        uploaded_file = BytesIO(b"uploaded_content")
        response = self.client.post("/", {"file-upload": uploaded_file})
        merge_mock.assert_called_once()
        save_mock.assert_called_once()
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "merger/index.html")
        self.assertEqual(response.resolver_match.func.view_class, IndexView)
        uploaded_file.close()
        merge_mock.return_value.close()