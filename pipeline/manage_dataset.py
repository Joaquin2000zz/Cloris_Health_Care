#!usr/bin/env python3
"""
module which contains DatasetManager class
"""
from glob import glob
import os
import re
import shutil


class DatasetManager:
    """
    class which perfors several methods to manage locations from files
    and visualize the labels quantities
    """
    def __init__(self, jpg: str=None, txt: str=None):
        """
        class constructor
        @jpg: must contain the path of the images
        @txt: must contain the path of the annotations
        """
        if (jpg and not isinstance(jpg, str)) and (txt and not isinstance(txt, str)):
            error = 'check the jpg and txt types. they must be strings)'
            error += '\nrepresenting the paths of the images '
            error +=  'and annotations folders respectively'
            raise TypeError(error)
        self.jpg = jpg
        self.txt = txt
        self.info = {}

    def change_folders(self, loc: list=[],
                       new_loc: list=[], extensions: list=[],
                       n=None, verbose: float=True):
        """
        method which changes directories of given extensions recursively
        """
        if not n:
            n = len(loc), len(new_loc), len(extensions)
        if isinstance(n, tuple):
            if n[0] != n[1] or n[0] != n[2]:
                error = 'invalid lenghts. loc and new_loc must '
                error += 'have same quantities of paths'
                raise SyntaxError(error)
            n = n[0]
        if n > 1:
            self.change_folders(loc=loc[1:], new_loc=new_loc[1:],
                                extensions=extensions[1:], n=n - 1,
                                verbose=verbose)

        loc, new_loc, ext = loc[0], new_loc[0], extensions[0]
        if False in [isinstance(x, str) for x in [loc, new_loc, ext]]:
            error = 'check the loc, new_loc, and ext. must be strings.'
            raise SyntaxError(error)
        loc = './' + loc if loc[0] != '.' else loc
        if not os.path.exists(path=loc):
            raise EnvironmentError(loc + ' does not exist')
        loc += '/*.{}'.format(ext) if loc[-1] != '/' else '*.{}'.format(ext)
        new_loc = './' + new_loc if new_loc[0] != '.' else new_loc
        if not os.path.exists(path=new_loc):
            os.makedirs(name=new_loc)
        new_loc += '/' if new_loc[-1] != '/' else ''
        setattr(self, ext, new_loc)

        for file in glob(loc):
            name = re.split(r'/|\\', file)[-1]
            # copy files into the new location
            new = new_loc + name
            if not os.path.exists(new):
                shutil.copyfile(file, new)
                continue
            if verbose:
                print(new, 'already exists.')
    def summary(self) -> dict:
        """
        makes as summary of the dataset. By computing the mean of each label,
        counts the dominant label in each image, compute the mean,
        the max value for each label and saves everything in the info attribute.
        also checks if each image of the dataset has its corresponding annotation
        and if the annotations are not corrupted
        returns the summary attribute
        """
        if not self.jpg or not self.txt:
            raise SyntaxError('check the jpg and txt attributes')
        self.jpg += '/' if self.jpg[-1] != '/' else ''
        self.txt += '/' if self.jpg[-1] != '/' else ''
        files = glob(self.jpg + '*.jpg')
        if not files:
            raise EnvironmentError(self.jpg + ' has no .jpg files')
        for file in files:
            name = re.split(r'/|\\', file)[-1]
            name = name.split('.')[0] + '.txt'
            name = self.txt + name
            if not os.path.exists(name):
                raise EnvironmentError(name + ' does not exists')
            x = {}
            with open(name, mode='r', encoding='utf8') as f:
                for i, line in enumerate(f):
                    args = line.split(' ')
                    n = len(args)
                    if n < 5:
                        error = name + ' has one of the lines with '
                        error += 'less than the spected values'
                        raise EnvironmentError(error)
                    for j, arg in enumerate(args):
                        if j == 0:
                            if not arg.isnumeric():
                                error = 'line '.format(i) + 'column'.format(j) + ' from '
                                error += name + ' has to be an integer as class name'
                                raise EnvironmentError(error)
                            if not x.get(arg):
                                x[arg] = 1
                            else:
                                x[arg] += 1
                        else:
                            if not arg.strip().replace('.', '', 1).isnumeric():
                                error = 'line '.format(i) + 'column'.format(j) + ' from '
                                error += name + '\nhas to be an float representing '
                                error += 'one of the coordinates of the bounding box'
                                raise EnvironmentError(error)
            for key in x:
                if not self.info.get(key):
                    self.info[key] = {'max': x[key], 'n': 1, 'sigma': x[key]}
                else:
                    old, new = self.info[key]['max'], x[key]
                    self.info[key]['max'] = new if new > old else old
                    self.info[key]['n'] += 1
                    self.info[key]['sigma'] += new
        for key in self.info:
            self.info[key]['mean'] = self.info[key]['sigma'] / self.info[key]['n']
        return self.info
            
if __name__ == '__main__':
    loc = ['./images/', './images/']
    new_loc = ['./train/images/', './train/annotations/']
    extensions = ['jpg', 'txt']
    dataset = DatasetManager()
    dataset.change_folders(loc=loc, new_loc=new_loc,
                           extensions=extensions, verbose=False)
    print(dataset.summary())
