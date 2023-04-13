#!usr/bin/env python3
"""
module which contains DatasetManager class
"""
from glob import glob
import os
import random
import re
import shutil


class DatasetManager:
    """
    class which perfors several methods to manage locations from files
    and visualize the labels quantities
    """

    def __init__(self, jpg: str = None, txt: str = None):
        """
        class constructor
        @jpg: must contain the path of the images
        @txt: must contain the path of the annotations
        """
        if (jpg and not isinstance(jpg, str)) and (txt and not isinstance(txt, str)):
            error = 'check the jpg and txt types. they must be strings)'
            error += '\nrepresenting the paths of the images '
            error += 'and annotations folders respectively'
            raise TypeError(error)
        self.jpg = jpg
        self.txt = txt
        self.is_splitted = False
        self.train = None
        self.val = None
        self.test = None

    def change_folders(self, loc: list = [],
                       new_loc: list = [], extensions: list = [],
                       n=None, verbose: float = True) -> None:
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
            error = 'check the loc, new_loc, and ext. must be lists of strings.'
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
            if name == 'classes.txt':
                continue
            # copy files into the new location
            new = new_loc + name
            if not os.path.exists(new):
                shutil.copyfile(file, new)
                continue
            if verbose:
                print(new, 'already exists.')

    @staticmethod
    def variance(X: list, mu: float, n: int, is_sample: bool = False):
        """
        computes the variance
        @X: are the datapoints
        @mu: is the mean (x bar in case of sample)
        @n: datapoints quantity
        @is_sample: flag which determines whether
                    is the sample or population variance
        Returns: the variance
        """
        if not X or not isinstance(X, list):
            raise TypeError('X must be a list')
        if not isinstance(n, int):
            raise TypeError('n must be a numerical value')
        if not isinstance(mu, int) and not isinstance(mu, float):
            raise TypeError('mu must be a numerical value')
        if not isinstance(is_sample, bool):
            raise TypeError('is_sample must be a boolean')
        sigma = sum([(x - mu) ** 2 for x in X])
        return sigma / n if not is_sample else sigma / (n - 1)

    def summary(self) -> dict:
        """
        makes as summary of the dataset. By computing the mean of each label,
        counts the dominant label in each image, compute the mean,
        the variance, the standard deviation, the max value for each label
        and saves everything in the info attribute.
        also checks if each image of the dataset has its corresponding annotation
        and if the annotations are not corrupted
        if self.is_splitted == True computes the sample variance for each sample
        returns the summary attribute
        """
        if not self.is_splitted:
            if not self.jpg or not self.txt:
                raise SyntaxError('check the jpg and txt attributes')
            self.jpg += '/' if self.jpg[-1] != '/' else ''
            self.txt += '/' if self.txt[-1] != '/' else ''
            files = glob(self.jpg + '*.jpg')
            if not files:
                raise EnvironmentError(self.jpg + ' has no .jpg files')
            self.info = {}
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
                                    error = 'line '.format(
                                        i) + 'column'.format(j) + ' from '
                                    error += name + ' has to be an integer as class name'
                                    raise EnvironmentError(error)
                                if not x.get(arg):
                                    x[arg] = 1
                                else:
                                    x[arg] += 1
                            else:
                                if not arg.strip().replace('.', '', 1).isnumeric():
                                    error = 'line '.format(
                                        i) + 'column'.format(j) + ' from '
                                    error += name + '\nhas to be an float representing '
                                    error += 'one of the coordinates of the bounding box'
                                    raise EnvironmentError(error)
                for key in x:
                    if not self.info.get(key):
                        self.info[key] = {'max': x[key], 'n': 1,
                                          'sum': x[key], 'X': [x[key]]}
                    else:
                        old, new = self.info[key]['max'], x[key]
                        self.info[key]['max'] = new if new > old else old
                        self.info[key]['n'] += 1
                        self.info[key]['sum'] += new
                        self.info[key]['X'].append(new)
            for key in self.info:
                mu = self.info[key]['sum'] / self.info[key]['n']
                self.info[key]['mean'] = mu
                variance = self.variance(X=self.info[key].pop('X'),
                                         mu=mu,
                                         n=self.info[key]['n'],
                                         is_sample=False)
                self.info[key]['variance'] = variance
                # tested and is the same as x ** (1/2) and np.sqrt(x)
                self.info[key]['stddev'] = variance ** .5
            return self.info

        samples = [self.train, self.val, self.test]
        if False in [isinstance(x, dict) for x in samples]:
            error = 'train, val and test must be dictionaries containing the locations '
            error += 'of the images and labels'
        self.info = {}
        for name_set, sample in zip(['train', 'val', 'test'], samples):
            sample['images'] += '/' if sample['images'][-1] != '/' else ''
            sample['labels'] += '/' if sample['labels'][-1] != '/' else ''
            files = glob(sample['images'] + '*.jpg')
            if not files:
                raise EnvironmentError(sample['images'] + ' has no .jpg files')
            self.info[name_set] = {}
            for file in files:
                name = re.split(r'/|\\', file)[-1]
                name = name.split('.')[0] + '.txt'
                name = sample['labels'] + name
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
                                    error = 'line '.format(
                                        i) + 'column'.format(j) + ' from '
                                    error += name + ' has to be an integer as class name'
                                    raise EnvironmentError(error)
                                if not x.get(arg):
                                    x[arg] = 1
                                else:
                                    x[arg] += 1
                            else:
                                if not arg.strip().replace('.', '', 1).isnumeric():
                                    error = 'line '.format(
                                        i) + 'column'.format(j) + ' from '
                                    error += name + '\nhas to be an float representing '
                                    error += 'one of the coordinates of the bounding box'
                                    raise EnvironmentError(error)
                for key in x:
                    if not self.info[name_set].get(key):
                        self.info[name_set][key] = {'max': x[key], 'n': 1,
                                                    'sum': x[key], 'X': [x[key]]}
                    else:
                        old, new = self.info[name_set][key]['max'], x[key]
                        self.info[name_set][key]['max'] = new if new > old else old
                        self.info[name_set][key]['n'] += 1
                        self.info[name_set][key]['sum'] += new
                        self.info[name_set][key]['X'].append(new)
            for key in self.info[name_set]:
                x_bar = self.info[name_set][key]['sum'] / \
                    self.info[name_set][key]['n']
                self.info[name_set][key]['mean'] = x_bar
                variance = self.variance(X=self.info[name_set][key].pop('X'),
                                         mu=x_bar,
                                         n=self.info[name_set][key]['n'],
                                         is_sample=True)
                self.info[name_set][key]['variance'] = variance
                # tested and is the same as x ** (1/2) and np.sqrt(x)
                self.info[name_set][key]['stddev'] = variance ** .5

        return self.info

    def change_label(self, old: list, new: list) -> None:
        """
        changes the label number
        """
        if not isinstance(old, list) or not isinstance(new, list):
            raise TypeError('old and new must be a list of integers')
        n = len(old), len(new)
        if n[0] != n[1]:
            error = 'the old and new labels lists must have same length'
            raise TypeError(error)
        for x, y in zip(old, new):
            if not isinstance(x, int):
                error = 'one or more elements of the old list is not an integer'
                raise TypeError(error)
            if not isinstance(y, int):
                error = 'one or more elements of the new list is not an integer'
        self.txt += '/' if self.txt[-1] != '/' else ''
        names = glob(self.txt + '*.txt')
        for name in names:
            with open(name, mode='r', encoding='utf8') as f:
                new_text = ""
                for line in f:
                    line = line.split(' ')
                    line[0] = str(new[old.index(int(line[0]))])
                    new_text += " ".join(line)
            with open(name, mode='w', encoding='utf8') as f:
                f.write(new_text)

    def split_data(self, path: str) -> tuple:
        """
        splits the dataset into training, validation and testing sets
        into 80% 10% and 10%
        """
        if not isinstance(path, str):
            error = 'path must be a string representing the path\n'
            error += 'in which you will split the dataset'
            raise TypeError(error)
        path = './' + path if path[0] != '.' else path
        path += '/' if path[-1] != '/' else ''
        if not os.path.exists(path):
            os.makedirs(path)
        self.jpg += '/' if self.jpg[-1] != '/' else ''
        self.txt += '/' if self.txt[-1] != '/' else ''
        names = glob(self.jpg + '*')
        random.shuffle(names)
        n = len(names)
        train, val_test = names[:int(n * .8)], names[int(n * .8):]
        n -= int(n * .8)
        val, test = val_test[:int(n * .5)], val_test[int(n * .5):]
        n = len(val), len(test)
        val, test = (test, val) if n[1] > n[0] else (val, test)
        path = './' + path if path[0] != '.' else path
        path += '/' if path[-1] != '/' else ''
        for x, dataset in zip(['train', 'val', 'test'], [train, val, test]):
            x += '/' if x[-1] != '/' else ''
            images = path + 'images/' + x
            labels = path + 'labels/' + x
            if not os.path.exists(path=images):
                os.makedirs(name=images)
            if not os.path.exists(path=labels):
                os.makedirs(name=labels)
            for file in dataset:
                name = re.split(r'/|\\', file)[-1].split('.')[0]
                os.replace(self.txt + name + '.txt',
                           labels + name + '.txt')
                os.replace(self.jpg + name + '.jpg',
                           images + name + '.jpg')
            setattr(self, x[:-1], {'images': images,
                                   'labels': labels})
        self.jpg = None
        self.txt = None
        self.is_splitted = True


if __name__ == '__main__':
    loc = ['./images/', './images/']
    new_loc = ['./apples/images/', './apples/labels/']
    extensions = ['jpg', 'txt']
    dataset = DatasetManager()
    dataset.change_folders(loc=loc, new_loc=new_loc,
                           extensions=extensions, verbose=False)
    print(dataset.__dict__)
    print(dataset.summary())
    dataset.change_label(old=[15, 16], new=[0, 1])
    print(dataset.summary())
    dataset.split_data(path='./apples/')
    print(dataset.train)
    print(dataset.val)
    print(dataset.test)
    labels = {}
    for sample in dataset.summary():
        print(sample + ':')
        for cls in dataset.info[sample]:
            print('class', cls + '\n', dataset.info[sample][cls])
            if not labels.get(cls):
                labels[cls] = dataset.info[sample][cls]['sum']
            else:
                labels[cls] += dataset.info[sample][cls]['sum']
    print(labels)
