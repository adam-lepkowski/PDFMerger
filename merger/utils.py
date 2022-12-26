from PyPDF2 import PdfMerger
from io import BytesIO


def merge(pdfs):
    """
    Merge pdfs.

    Parameters
    ----------
    pdfs: iterable
        an iterable containing pdfs to merge

    Returns
    ----------
    BytesIO
        Stream containing the merged pdf file.
    """
    
    merger = PdfMerger()
    for pdf in pdfs:
        merger.append(pdf)
    obj = BytesIO()
    merger.write(obj)
    obj.seek(0)
    return obj