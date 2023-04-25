import styles from '../style';
import { holbertonLogo } from '../style/assets';
import GetStarted from './GetStarted';
import { roboHand, fingers, apple } from '../style/assets';


const Introduction = () =>
(
  <section id='introduction' className={`flex
    md:flex-row flex-col ${styles.paddingY}`}>
    <div className={`flex-1 ${styles.flexStart}
      flex-col xl:px-0 sm:px-16 px-6`}>
      <div className='flex flex-row
        items-center py-[6px] px-4
        bg-discount-gradient rounded-[10px] mb-2'>
        <img src={holbertonLogo} alt='holbertonLogo'
          className='w-[32px] h-[32px]' />
        <p className={`${styles.paragraph}
          ml-2`}>
          Holberton School {' '}
          <span className='text-white'>Machine Learning</span> Specialization Final Project
        </p>
      </div>

      <div className='flex flex-row
        justify-between items-center w-full'>
        <h1 className='flex-1 font-poppins font-semibold
          ss:text-[72px] text-[52px] text-white ss:leading-[100px]
          leading-[75-px]'>
          The Future<br className='sm:block hidden' /> {' '}
          <span
            className='text-gradient'>Is Already Happening
          </span> {' '}
        </h1>
        <div className='ss:flex hidden md:mr-4
          mr-0'>
          <GetStarted></GetStarted>
        </div>
      </div>
      <h1 className='font-poppins font-semibold
          ss:text-[68px] text-[52px] text-white ss:leading-[100px]
          leading-[75-px] w-full'>
        Thanks To AI
      </h1>
      <p className={`${styles.paragraph} max-w[470px] mt-5`}>
        <span
          className='text-gradient'>"We are the middle children of history. Born too late to explore earth, born too early to explore space." - Anonymous.
        </span>
        <br />
        Fortunately, we are lucky because nowadays, there is a wider list of machine learning models,
        designed for solving several tasks such as natural language processing, audio processing, computer vision,
        metric predictions, etc. As days pass, the idea of integrating such models into daily tasks is taking more and more strength.
        Such phenomena arrived to stay and we will live with this, by taking advantage of them as tools they are.
      </p>
    </div>
    <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
      <img src={roboHand} alt='roboHand'
        className='absolute top-0 left-0 z-10' />
      <img src={apple} alt='apple'
        className='z-20 absolute animate-up-down -top-0' />
      <img src={fingers} alt='fingers'
        className='absolute top-0 left-0 z-20' />
      <div className='absolute z-[0] w-[40%]
      h-[35%] top-0 pink__gradient'/>
      <div className='absolute z-[1] w-[80%]
      h-[80%] rounded-full bottom-40
      white__gradient'/>
      <div className='absolute z-[0] w-[50%]
      h-[50%] right-20 bottom-20 blue__gradient'/>
    </div>
    <div className={`ss:hidden ${styles.flexCenter}`}>
      <GetStarted />
    </div>
  </section>
);

export default Introduction;