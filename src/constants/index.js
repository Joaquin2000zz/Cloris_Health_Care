import {
  people01, linkedin, classification,
  objectDetection, semanticSegmentation, instanceSegmentation,
  performance, gridCellDivision, precisionRecallCurves, yolov8Segmentation, github,
  metrics, train, FPExample
} from '../style/assets';


export const labelMap = {
  0: { name: 'Healty apple', color: 'green' },
  1: { name: 'Unhealthy apple', color: 'red' }
}

export const navLinks = [
  {
    id: 'introduction',
    title: 'Introduction',
  },
  {
    id: 'description',
    title: 'Description',
  },
  {
    id: 'product',
    title: 'Product',
  },
  {
    id: 'team',
    title: 'Our Team',
  },
  {
    id: 'model',
    title: 'Model'
  }
];

export const featuresDescription = [
  {
    id: 'example-1',
    img: classification,
    description: 'Image Classification Example',
    source: 'Experimental process in my first use of the Transfer Learning technique',
    link: 'https://www.linkedin.com/pulse/experimental-process-my-first-use-transfer-learning-victoria-delgado/'
  },
  {
    id: 'example-2',
    img: objectDetection,
    description: 'Object Detection Example',
    source: "Extraction from the testing data set in which our model's performance was tested after becoming trained",
  },
  {
    id: 'example-3',
    img: semanticSegmentation,
    description: 'Semantic Segmentation Example',
    source: 'Semantic Segmentation in the era of Neural Networks | AI Summer',
    link: 'https://theaisummer.com/Semantic_Segmentation/'
  },
  {
    id: 'example-4',
    img: instanceSegmentation,
    description: 'Instance Segmentation Example',
    source: 'Solving Industrial Challenges with Instance Segmentation',
    link: 'https://deeplobe.ai/solving-industrial-challenges-with-instance-segmentation/'
  }
];

export const featuresYOLO = [
  {
    id: 'example-1',
    img: performance,
    description: "YOLOv7's performance with the rest of its previous versions in the COCO dataset",
    source: 'Official YOLOv7 website',
    link: 'https://github.com/WongKinYiu/yolov7'
  },
  {
    id: 'example-2',
    img: gridCellDivision,
    description: 'Grid Cell Division, BBoxes Predictions, and NMS Intuitions',
    source: 'YOLO paper from the arXiv official website',
    link: 'https://arxiv.org/abs/1506.02640'
  },
  {
    id: 'example-3',
    img: precisionRecallCurves,
    description: 'Picasso Dataset precision-recall curves',
    source: 'YOLO paper from the arXiv official website',
    link: 'https://arxiv.org/abs/1506.02640'
  },
  {
    id: 'example-4',
    img: yolov8Segmentation,
    description: 'Instance Segmentation Example',
    source: 'YOLOv8 Ultralytics: State-of-the-Art YOLO Models',
    link: 'https://learnopencv.com/ultralytics-yolov8/'
  }
];

export const featuresTraining = [
  {
    id: 'example-1',
    img: train,
    description: "Train Loss curve across training",
    source: 'Snapshots from training logs visualized in TensorBoard',
  },
  {
    id: 'example-2',
    img: metrics,
    description: 'Mean Average Precision, Precision and Recall curves across training',
    source: 'Snapshots from training logs visualized in TensorBoard',
  },
  {
    id: 'example-3',
    img: FPExample,
    description: 'Prediction containing a false positive. The middle apple was classified incorrectly',
    source: 'Another extraction from the testing data set',
  }
];


export const pInfo = [
  {
    id: 'pInfo-1',
    content:
      'I love Programming, Math, Physics, and the way they interact with each other to describe reality.',
    name: 'Joaquin Victoria',
    title: 'Machine Learning Developer | Back End Developer | Full Stack Developer',
    link: 'https://joaquin2000zz.github.io/Joaquin2000zz/about/me.html',
    img: people01,
  }
];

export const footerLinks = [
  {
    title: 'Useful Links',
    links: [
      {
        name: 'Content',
        link: 'https://www.hoobank.com/content/',
      },
      {
        name: 'How it Works',
        link: 'https://www.hoobank.com/how-it-works/',
      },
      {
        name: 'Create',
        link: 'https://www.hoobank.com/create/',
      },
      {
        name: 'Explore',
        link: 'https://www.hoobank.com/explore/',
      },
      {
        name: 'Terms & Services',
        link: 'https://www.hoobank.com/terms-and-services/',
      },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        name: 'Help Center',
        link: 'https://www.hoobank.com/help-center/',
      },
      {
        name: 'Partners',
        link: 'https://www.hoobank.com/partners/',
      },
      {
        name: 'Suggestions',
        link: 'https://www.hoobank.com/suggestions/',
      },
      {
        name: 'Blog',
        link: 'https://www.hoobank.com/blog/',
      },
      {
        name: 'Newsletters',
        link: 'https://www.hoobank.com/newsletters/',
      },
    ],
  },
  {
    title: 'Partner',
    links: [
      {
        name: 'Our Partner',
        link: 'https://www.hoobank.com/our-partner/',
      },
      {
        name: 'Become a Partner',
        link: 'https://www.hoobank.com/become-a-partner/',
      },
    ],
  },
];

export const socialMedia = [
  {
    id: 'social-media-1',
    icon: linkedin,
    link: 'https://www.linkedin.com/in/joaquin-victoria-dev/',
  },
  {
    id: 'social-media-2',
    icon: github,
    link: 'https://github.com/Joaquin2000zz',
  }
];
