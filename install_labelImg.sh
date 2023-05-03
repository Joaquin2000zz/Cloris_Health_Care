#!/usr/bin/env bash
# first run this. afterwards you would be able to run labelImg by using this:
# python3 labelimg/labelImg.py
git clone https://github.com/tzutalin/labelImg labelimg
cd labelimg
pyrcc5 -o libs/resources.py resources.qrc