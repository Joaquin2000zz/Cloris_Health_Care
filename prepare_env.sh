#!/usr/bin/env bash
# first run this. afterwards you would be able to run labelImg by using this:
# python3 labelimg/labelImg.py 
mkdir labelimg
mkdir images
mkdir labels
git clone https://github.com/tzutalin/labelImg labelimg
cd labelimg && pyrcc5 -o libs/resources.py resources.qrc
sudo apt -y install libportaudio2
pip3 install -q --use-deprecated=legacy-resolver tflite-model-maker
pip3 install -q pycocotools
pip3 install -q opencv-python-headless==4.1.2.30
pip3 uninstall -y tensorflow && pip3 install -q tensorflow==2.8.0
