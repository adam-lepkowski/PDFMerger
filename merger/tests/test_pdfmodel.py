from unittest.mock import patch
from io import BytesIO

from django.test import TestCase

from merger.models import PdfModel


class TestPdfModel(TestCase):

    @patch("django.db.models.Model.save")
    @patch("merger.models.ContentFile")
    def test_save(self, contentfile_mock, super_save_mock):
        uploaded_file = BytesIO(b"uploaded_content")
        file = PdfModel(file=uploaded_file)
        file.save()
        contentfile_mock.assert_called_with(uploaded_file, "upload.pdf")
        super_save_mock.assert_called_once()
