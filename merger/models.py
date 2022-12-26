from django.db import models
from django.core.files.base import ContentFile


class PdfModel(models.Model):
    """
    Represent and store merged PDF files.
    """

    file = models.FileField(upload_to="pdfs")

    def save(self, *args, **kwargs):
        """
        Convert BytesIO into ContentFile before saving.
        """

        self.file = ContentFile(self.file, "upload.pdf")
        super().save(*args, **kwargs)
    
    def __str__(self):
        return str(self.file.name)