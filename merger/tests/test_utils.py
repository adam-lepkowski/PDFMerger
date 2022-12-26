from unittest.mock import patch, call
from io import BytesIO

from django.test import SimpleTestCase

from merger.utils import merge


class TestMerge(SimpleTestCase):

    @patch("merger.utils.PdfMerger.write")
    @patch("merger.utils.PdfMerger.append")
    def test_merge_append_files(self, append_mock, write_mock):
        files = ["file1", "file2", "file3"]
        result = merge(files)
        self.assertEqual(append_mock.call_count, 3)
        expected_append_calls = [call(file) for file in files]
        result_append_calls = append_mock.mock_calls
        self.assertEqual(expected_append_calls, result_append_calls)
        write_mock.assert_called_once()
        self.assertTrue(isinstance(result, BytesIO))
