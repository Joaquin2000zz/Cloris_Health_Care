import styles from '../style';

const ModelDescription = () =>
(
  <section id='model' className={`${styles.flexCenter} ${styles.marginY}
    ${styles.padding} sm:flex-row flex-col bg-black-gradient-2
    rounded-[20px] box-shadow`}>
    <div className='flex-1 flex flex-col'>
      <div className='absolute z-[0] w-[60%] h-[60%]
      -right-[50%] rounded-full blue__gradient'/>
      <h2 className={styles.heading2}>Give it a try!</h2>
      <p className={`${styles.paragraph} mt-5`}>
        Our model was obtained by performing <span onClick={() => window.open(
          'https://www.linkedin.com/pulse/experimental-process-my-first-use-transfer-learning-victoria-delgado/')}
          className='text-gradient cursor-pointer'>transfer learning</span>{' '}
        in a custom dataset, using the given pertained weights as a feature extractor.{' '}
        This allows for achieving acceptable results using a reduced data set, computational power and training time.{' '}
        The training consisted in fine tuning a <span onClick={() => window.open(
          'https://github.com/WongKinYiu/yolov7')}
          className='text-gradient cursor-pointer'>pre-trained YOLOv7</span> in a data set created from scratch containing 971 images which .<br />
        The goal was classify whether unhealthy or healthy apples.
      </p>
    </div>
    <div className={`${styles.flexCenter} sm:ml-10 ml-0
      sm:mt-0 mt-10`}>
    </div>
  </section>
)

export default ModelDescription;