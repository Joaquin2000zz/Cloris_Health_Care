import styles from '../style';
import { clorisLogo } from '../style/assets';
import { footerLinks, socialMedia } from '../constants';


const Footer = () =>
(
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row
      flex-col mb-8 w-full`}>
      <div className='flex-1 flex flex-row justify-start mr-10 items-center space-x-1'>
        <img src={clorisLogo} alt='cloris'
          className='w-[266px] h-[72px] object-contain' />
        <p className={`${styles.paragraph} text-[28px] mt-4`}>
          <span
            className='text-gradient'>Health Care </span >
        </p>
      </div>
    </div>
    <div className='w-full flex justify-between items-center
    md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]'>
    </div>
    <div className='flex flex-row md:mt-0 mt-6'>
      {socialMedia.map((social, index) => (
        <img key={social.id}
          src={social.icon}
          alt={social.id}
          className={`w-[21px] h-[21px] object-contain cursor-pointer rounded-full
        ${index !== socialMedia.length - 1 ? 'mr-6' : 'mr-0'}`}
          onClick={() => window.open(social.link)} />
      ))}
    </div>
  </section>
);

export default Footer;