#!/usr/bin/env bash
# first run this. afterwards you would be able to run labelImg by using this:
# python3 labelimg/labelImg.py 
sudo apt-get update
sudo apt-get install build-essential checkinstall
sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev
cd /usr/src
wget https://www.python.org/ftp/python/3.5.9/Python-3.5.9.tgz
sudo tar xzf Python-3.5.9.tgz
cd Python-3.5.9
sudo ./configure --enable-optimizations
sudo make altinstall
python3.5 -V
mkdir labelimg
mkdir images
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

