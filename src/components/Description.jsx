import styles, { layout } from '../style';
import Button from './Button';
import ComputerVision from './ComputerVision';
import { featuresDescription } from '../constants'


const Description = () =>
(
  <section id='description' className={`${layout.section} items-start`}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Bringing the vision
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Computer vision arrived as a technique to make computers able to recognize patterns such as edges and textures.{' '}
        Doing so, they discern between classes the model was trained for.<br /><br />
        There are a bunch of types of computer vision techniques. First of all, we have the object classification.
        Which is the task of scoring the probability of a class appearing in a given image. Then we have the object detection,{' '}
        that is the task of marking with a bounding box {'('}marked with its score{')'} where an instance of the class in the image appears.
        Also, we have the semantic segmentation. Defined as the task of segmenting the pixels belonging to each class. And last but not least, the instance segmentation, {' '}
        arrived as the task of segmenting as semantic segmentation does, but with the addition of discriminating between objects. Making for each instance a segmentation referring to its class.
        <br /><br />There are many more applications e.g. pose estimation, depth estimation, etc. Summarized were named and described the most known. However, I let it as an exercise for curious lectors to search for which are the rest of the applications.
      </p>
      <Button onClick={() => window.location.href = '#model'} styles='mt-10' text='Get Started' />
    </div>
    <div className={`${layout.sectionImg} flex-col`}>
      {featuresDescription.map((feature, index) => (
        <ComputerVision key={feature.id} {...feature} index={index} n={featuresDescription.length} />
      ))}
    </div>
  </section>
);

export default Description;
