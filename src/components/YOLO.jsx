import { } from '../style/assets';
import styles, { layout } from '../style';
import ComputerVision from './ComputerVision';
import { featuresYOLO } from '../constants';


const YOLO = () =>
(
  <section id="product" className={layout.sectionReverse}>
    <div className={`${layout.sectionImgReverse} flex-col`}>
      {featuresYOLO.map((feature, index) => (
        <ComputerVision key={feature.id} {...feature} index={index} n={featuresYOLO.length} />
      ))}
      <div className='absolute z-[3] -left-1/2
        top-0 w-[50%] h-[50%] rounded-full white__gradient'/>
      <div className='absolute z-[0] -left-1/2
        b-0 w-[50%] h-[50%] rounded-full pink__gradient'/>
    </div>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        What does YOLO stand to mean?
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        YOLO is popular known as You Only Live Once. But in the context of machine learning, refers to You Only Look Once,{' '}
        a machine learning model that revolutionized the computer field. This algorithm can detect multiple objects in images in real-time. It was introduced by Joseph Redmon et al.{' '}
        in 2015 and has since become the state-of-art widely used object detection algorithm due to its speed and accuracy.
        YOLO divides an input image into a grid of cells and predicts bounding boxes and class probabilities for objects within each grid cell.{' '}
        YOLO's workflow is detailed as follows:
      </p>
      <h3 className='font-poppins text-white text-[30px]'>Grid Cell Division:</h3>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      The input image is divided into a grid of cells, typically with a fixed size of 7x7 or 13x13.{' '}
      Each cell is responsible for detecting objects that fall within its boundaries.
      </p>
      <h3 className='font-poppins text-white text-[30px]'>Bounding Box Prediction:</h3>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      The input image is divided into a grid of cells, typically with a fixed size of 7x7 or 13x13.{' '}
      Each cell is responsible for detecting objects that fall within its boundaries.
      </p>
      <h3 className='font-poppins text-white text-[30px]'>Class Prediction:</h3>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      YOLO also predicts the class probabilities for each cell, indicating the probability of an object belonging to a certain class.{' '}
      The number of class probabilities depends on the number of classes in the dataset being trained on.
      </p>
      <h3 className='font-poppins text-white text-[30px]'>Anchor Boxes:</h3>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      YOLO uses anchor boxes, which are pre-defined bounding box shapes of different scales and aspect ratios, to improve the accuracy of object detection.{' '}
      Each anchor box is associated with a specific grid cell, and the model predicts the offsets to the anchor boxes to obtain the final bounding box predictions.
      </p>
      <h3 className='font-poppins text-white text-[30px]'>Non-maximum Suppression {'('}NMS{')'}:</h3>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      After obtaining the bounding box predictions from all the cells, YOLO applies NMS to filter out overlapping bounding boxes and keep only the ones with the highest confidence scores.{' '}
      This helps to eliminate duplicate detections and obtain a more accurate and concise set of object detections.
      </p>
      <h3 className='font-poppins text-white text-[30px]'>Training:</h3>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      During the training process, YOLO uses labeled data with ground truth bounding box annotations to learn the optimal parameters for predicting bounding boxes and class probabilities.{' '}
      The loss function used in YOLO takes into account both the localization accuracy {'('}bounding box predictions{')'} and the classification accuracy {'('}class predictions{')'}.
      </p>
      <h3 className='font-poppins text-white text-[30px]'>Inference:</h3>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      During inference, YOLO takes an input image and passes it through the trained neural network to obtain the bounding box predictions and class probabilities.{' '}
      The bounding boxes with high confidence scores are then post-processed using NMS to obtain the final object detections.
      </p>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      YOLO is known for its real-time object detection capabilities, making it suitable for applications such as video surveillance, autonomous vehicles, and robotics. It has been widely used and extended in various forms,{' '}
      including YOLOv2, YOLOv3, ..., until YOLOv8, with improvements in accuracy and speed.
      </p>
      <div className='flex flex-row flex-wrap
        sm:mt-10 mt-6'>
      </div>
    </div>

  </section>
)

export default YOLO;