import styles from '../style';
import { arrowUp } from '../style/assets';

const GetStarted = () =>
(
  <div onClick={() => window.location.href='#model'}className={`${styles.flexCenter}
    w-[140px] h-[140px] rounded-full bg-blue-gradient
    p-[2px] cursor-pointer`}>
    <div className={`${styles.flexCenter}
      flex-col bg-primary w-[100%] h-[100%]
      rounded-full`}>
      <div className={`${styles.flexStart}
        flex-row`}>
        <a className='font-poppins font-medium
          text-[18px] leading-[23px] mr-2'>
          <span className='text-gradient'>Get</span>
        </a>
        <img src={arrowUp} alt='arrow'
          className='w-[23px] h-[23px]
        object-contain'/>
      </div>
      <a className='font-poppins font-medium
          text-[18px] leading-[23px]'>
        <span className='text-gradient'>Started</span>
      </a>
    </div>
  </div>
);

export default GetStarted;