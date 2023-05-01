#!/usr/bin/env bash
git clone https://github.com/tzutalin/labelImg labelimg
cd labelimg
pyrcc5 -o libs/resources.py resources.qrc