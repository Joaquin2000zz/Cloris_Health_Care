#!/usr/bin/env python3
"""
module which contains change_ext function
"""
from glob import glob
import os
from PIL import Image
from uuid import uuid4


def change_ext(ext: str='.jpg', change_names: bool=True) -> None:
    """
    changes the extension from image files and change the names if needed
    CAUTION: - this function takes every file from images folder,
             no matter the extension and changes their extensions
             with @ext content
             - if you have already the image annotations and you set the
             @change_names variable to True, you gonna lost the reference name
             to the annotations 
    """
    if not os.path.exists('./images'):
        raise EnvironmentError('the project must have a folder called images')
    images = glob('./images/*')
    for image in images:
        image = Image.open(image)
        image = image.convert('RGB')
        if change_names:
            image.save(str(uuid4()) + ext if ext[0] == '.' else '.' + ext)
