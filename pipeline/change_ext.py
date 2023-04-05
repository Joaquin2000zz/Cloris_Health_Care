#!/usr/bin/env python3
"""
module which contains change_ext function
"""
from glob import glob
import os
from PIL import Image
from uuid import uuid4


def change_ext(ext: str='jpg', change_names: bool=True, folder: str='./images') -> None:
    """
    changes the extension from image files and change the names if needed
    CAUTION: - this function takes every file from images @folder,
             no matter the extension and changes their extensions
             with @ext content
             - if you have already the image annotations and you set the
             @change_names variable to True, you gonna lost the reference name
             to the annotations 
    """
    folder = './' + folder if folder[:2] != './' else folder
    ext = ext if ext[0] == '.' else '.' + ext
    if not os.path.exists('./' if folder[0] != '.' else '' + folder):
        error = 'the project must have a {} called images'.format(folder)
        raise EnvironmentError(error)
    images = glob(folder + '/*' if folder[-1] != '/' else '*')
    if not images:
        error = 'images folder is empty'
        raise EnvironmentError(error)
    for name in images:
        image = Image.open(name)
        image = image.convert('RGB')
        if change_names:
            path = folder + '/' + str(uuid4()) + ext
            image.save(path)
            del image
            os.remove(name)
