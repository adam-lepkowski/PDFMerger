from unittest.mock import patch
from io import BytesIO

from django.test import TestCase
from parameterized import parameterized

from merger.models import PdfModel


class TestPdfModel(TestCase):

    @patch("merger.models.uuid.uuid4", return_value="upload")
    @patch("django.db.models.Model.save")
    @patch("merger.models.ContentFile")
    def test_save(self, contentfile_mock, super_save_mock, uuid_mock):
        uploaded_file = BytesIO(b"uploaded_content")
        file = PdfModel(file=uploaded_file)
        file.save()
        contentfile_mock.assert_called_with(uploaded_file, "upload.pdf")
        super_save_mock.assert_called_once()

    @parameterized.expand([
        ("str", "string"),
        ("int", 1),
        ("float", 1.2)
    ])
    def test_save_not_bytes_raises_error(self, type, value):
        invalid_type = value
        file = PdfModel(file=invalid_type)
        with self.assertRaises(TypeError):
            file.save()
