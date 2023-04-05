"""
module which contains augment_directory function
"""
import tensorflow as tf


def augment_directory(ext: str='jpg', folder: str='./images') -> None:
    """
    changes the extension from image files and change the names if needed
    CAUTION: - this function takes every file from images @folder,
             no matter the extension and changes their extensions
             with @ext content
             - if you have already the image annotations and you set the
             @change_names variable to True, you gonna lost the reference name
             to the annotations 
    """
    folder = './' if folder[0] != '.' else '' + folder

    datagen = tf.keras.preprocessing.image.ImageDataGenerator(
        featurewise_center=True,
        featurewise_std_normalization=True,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True)

    data = tf.keras.preprocessing.image.DirectoryIterator(
        folder, datagen, target_size=(256, 256), zca_whitening=True, color_mode='rgb',
        classes=None, class_mode='categorical', batch_size=32, shuffle=True, seed=None,
        data_format=None, save_to_dir=folder, save_prefix='mod-', save_format=ext,
        follow_links=False, subset=None, interpolation='nearest', dtype=None
    )
    for batch in data.__iter__():
        print(data)