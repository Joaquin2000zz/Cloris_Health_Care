# Cloris Health Care <img style="transform: translateY(3px);" src="https://github.com/Joaquin2000zz/Cloris_Health_Care/blob/main/src/style/assets/logo.png?raw=true" height="40px">
## About the Project:
Cloris Health Care is a web app containing a deep convolutional neural network trained to classify whether an apple is healthy or unhealthy using object detection. However, the content of this repository is portable and applicable to whichever object detection task you want because it contains an end-to-end pipeline you can customize in your dataset. If you're interested, the last part of the readme will detail how to do it.
### Technologies used:
![image](https://img.shields.io/badge/Colab-F9AB00?style=for-the-badge&logo=googlecolab&color=525252)
![image](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![image](https://img.shields.io/badge/Jupyter-F37626.svg?&style=for-the-badge&logo=Jupyter&logoColor=white)
<img style="background-color: #000000;" src="https://github.com/onnx/onnx.github.io/blob/main/images/ONNX-Logo.svg?raw=true" height="28px" width="100px">
![image](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![image](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![image](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![image](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

## Try it out!
The model is available in our website <a style="background-color: #149ddd;
  color: #fff;
  border: .4px solid #173b6c;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: small;
  cursor: pointer;
  transition: .6s; " > <b>Go to the Website<b></a>

## Installation:

Depending your use case, you will find differents instructions.

### Local Host Usage:
```bash
git clone https://github.com/Joaquin2000zz/Cloris_Health_Care/
cd Cloris_Health_Care
sh prepare_env_local.sh
```

### Google Cloud Host Usage:
```bash
git clone https://github.com/Joaquin2000zz/Cloris_Health_Care/
cd Cloris_Health_Care
sh prepare_env_gcs.sh
```

### Pipeline Usage:

Use [Colab](https://colab.research.google.com/) and open the cloris.ipynb notebook in there. You will find all the information needed in the file. Ensure that you read the documentation of the files before starting to avoid problems or incorrect usage. In case you will use a custom dataset, recommended to follow this steps:

```bash
sh install_labelImg.sh
python labelimg/labelImg.py
```

In case you will make the training locally, you can install all the dependencies like this:

```bash
sh prepare_env_training.sh
```

## App screenshots:
![alt text](https://github.com/Joaquin2000zz/Cloris_Health_Care/blob/main/src/style/assets/appSS.png?raw=true)
