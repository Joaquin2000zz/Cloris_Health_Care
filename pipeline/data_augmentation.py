"""
module which contains augment_directory function and the Augmentation class
"""
from glob import glob
import numpy as np
import tensorflow as tf
import os
from PIL import Image

class Augmentation:
    """
    class which performs augmentations to images
    """
    def __init__(self):
        """
        class constructor
        """
        self.fVect = [self.flip_image, self.crop_image, self.rotate_image,
                      self.shear_image, self.change_brightness, self.change_hue]

    def apply_random_transformation(self, image: tf.Tensor) -> tf.Tensor:
        """
        apply PCA and two random transformations to the given @image
        """
        image = self.pca_color(image)
        f_l = len(self.fVect)
        k = np.random.randint(0 , f_l, size=(1))[0]
        image = self.fVect[k](image)
        while 2 + 2 == 4:
            check = np.random.randint(0 , f_l, size=(1))[0]
            if check != k:
                k = check
                break
        return self.fVect[k](image)
    
    @staticmethod
    def flip_image(image: tf.Tensor) -> tf.Tensor:
        """
        rotates an image horizontally
        @image: 3D tf.Tensor of shape (w, h, 3) containing the image to flip
        Returns: the transformed image
        """
        n = len(image.shape)
        if n != 3 and n != 4:
            msg = 'flip_left_right accepts whether:'
            msg += '\n3D [height, width, chanels] '
            msg += 'or 4D [batch, height, width, chanels] tensor'
            raise TypeError(msg)
        return tf.image.flip_left_right(image)

    @staticmethod
    def crop_image(image, size: tuple=()) -> tf.Tensor:
        """
        makes a random crop in given an image and size
        @image: tf.Tensor of shape (w, h, 3) containing the image
        @size: tuple of shape (w, h)
        Returns: the cropped image
        """
        n = len(image.shape)
        if n != 3 and n != 4:
            msg = 'flip_left_right accepts whether:'
            msg += '\n3D [height, width, chanels] '
            msg += 'or 4D [batch, height, width, chanels] tensor'
            raise TypeError(msg)
        if not size:
            w, h, c = image.shape
            size = (w // 2, h // 2, c)
        n = len(size)
        if n != 3:
            raise TypeError('size must be a 1D tensor length 3')
        return tf.image.random_crop(image, size)

    @staticmethod
    def rotate_image(image: tf.Tensor, k: int=1) -> tf.Tensor:
        """
        rotates an image 90 degrees counter-clockwise
        @image: is a 3D tf.Tensor of shape (w, h, 3) containing the image to flip
        Returns: the flipped image
        """
        n = len(image.shape)
        if n != 3 and n != 4:
            msg = 'flip_left_right accepts whether:'
            msg += '\n3D [height, width, chanels] '
            msg += 'or 4D [batch, height, width, chanels] tensor'
            raise TypeError(msg)
        return tf.image.rot90(image, k=k)

    @staticmethod
    def shear_image(image: tf.Tensor, intensity: int=50) -> tf.Tensor:
        """
        randomly shears an image
        @image: is a 3D tf.Tensor of shape (w, h, 3) containing the image to flip
        @intensity: transformation intensity in degrees
        Returns: the flipped image
        """
        n = len(image.shape)
        if n != 3:
            msg = 'random_shear accepts 3D [height, width, chanels] '
            raise TypeError(msg)
        if not isinstance(intensity, int):
            raise TypeError('intensity must be an integer')
        return tf.keras.preprocessing.image.random_shear(image, intensity)

    @staticmethod
    def change_brightness(image: tf.Tensor,
                      max_delta: float=np.random.uniform(0,
                                                         .3)) -> tf.Tensor:
        """
        randomply changes the brghtness in an image
        @image: 3D tf.Tensor of shape (w, h, 3) to transform
        @max_delta: maxing amount the image should be brightened (or darkened)
        Returns: the flipped image
        """
        n = len(image.shape)
        if n != 3:
            msg = 'random_brightness accepts 3D [height, width, chanels] '
            raise TypeError(msg)
        if not isinstance(max_delta, float):
            raise TypeError('max_delta must be a float')
        return tf.image.random_brightness(image, max_delta)

    @staticmethod
    def change_hue(image: tf.Tensor,
               delta: float=-np.random.uniform(0, .5)) -> tf.Tensor:
        """
        changes the hue in an image in a factor of delta
        @image: 3D tf.Tensor of shape (w, h, 3) to transform
        @delta: amount the image should change
        Returns: the flipped image
        """
        n = len(image.shape)
        if n != 3:
            msg = 'random_brightness accepts 3D [height, width, chanels] '
            raise TypeError(msg)
        if not isinstance(delta, float):
            raise TypeError('delta must be a float')
        return tf.image.adjust_hue(image, delta)
    
    @staticmethod
    def pca_color(image: tf.Tensor,
              alphas=np.random.normal(0, 0.1, 3)) -> tf.Tensor:
        """
        computes pca for images described in the AlexNet paper
        link: https://papers.nips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf
        """
        # convert the image tensor to a 2D tensor
        h, w, c = image.shape
        flattened_image = tf.cast(tf.reshape(image, [-1, c]),
                                  tf.float32)
        # compute z score for each datapoint
        mean = tf.math.reduce_mean(flattened_image, axis=0)
        centered_image = flattened_image - mean
        stdd = tf.math.reduce_std(centered_image, axis=0)
        centered_image /= stdd
        # compute sample covariance matrix
        covariance = tf.matmul(centered_image, centered_image,
                               transpose_a=True) / tf.cast(h * w, tf.float32) - 1
        # compute the eigenvectors and eigenvalues of the covariance matrix
        eigenvalues, eigenvectors = tf.linalg.eigh(covariance)

        alphas = alphas * eigenvalues
        projection_matrix = tf.matmul(eigenvectors, alphas[:, tf.newaxis])
      
        pca_image = centered_image + tf.transpose(projection_matrix)
        pca_image *= stdd
        pca_image += mean
        # comment this line if you want cool images haha
        pca_image = tf.math.maximum(tf.math.minimum(pca_image, 255)
                                , 0)
        pca_image = tf.cast(pca_image, dtype='uint8')
        pca_image = tf.reshape(pca_image, [h, w, c])

        return pca_image

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
    folder = './' + folder if folder[:2] != './' else folder
    ext = ext if ext[0] == '.' else '.' + ext
    if not os.path.exists('./' if folder[0] != '.' else '' + folder):
        error = 'the project must have a {} called images'.format(folder)
        raise EnvironmentError(error)
    images = glob(folder + '/*' if folder[-1] != '/' else '*')
    if not images:
        error = 'images folder is empty'
        raise EnvironmentError(error)
    augmentation = Augmentation()
    for path in images:
        name = path.split('/')[-1]
        if 'aug_' in name:
            print(name, 'already exists')
            continue
        name = 'aug_' + name
        new = folder + '/' if folder[-1] != '/' else ''
        new += name
        if os.path.exists(new):
            print(name, 'already exists')
            continue
        image = tf.convert_to_tensor(Image.open(path))
        image = augmentation.apply_random_transformation(image)
        image = tf.keras.utils.array_to_img(image)
        image.save(new)
        del image
