#!/usr/bin/env bash
# first run this. afterwards you would be able to run labelImg by using this:
# python3 labelimg/labelImg.py 
conda create --name py35 python=3.5
source activate py35
mkdir labelimg
mkdir images
mkdir labels
mkdir healthy_apple
mkdir rotten_apple
git clone https://github.com/tzutalin/labelImg labelimg
cd labelimg
pyrcc5 -o libs/resources.py resources.qrc
pip3 install -U onnx
pip3 install -U onnxruntime
pip3 install -U onnx-tf
pip3 install -U tensorflow-addons
pip3 install -U tensorflowjs
pip3 install -U simple-onnx-processing-tools
pip3 install -U nvidia-pyindex
pip3 install -U onnx-graphsurgeon
pip3 install -U tensorflow-probability
pip3 install -U pyarrow
pip3 uninstall keras
pip3 install -U tensorflow keras