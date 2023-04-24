import { quotes } from '../style/assets';
import Button from './Button';

const PersonalInfo = ({ content, name, title, link, img }) =>
  (
    <div className='flex justify-between flex-col
    px-10 py-12 rounded-[20px] items-center
    md:mr-10 sm:mr-5 mr-0 my-5 feedback-card'>
      <img src={quotes} alt='double_quotes'
      className='w-[42px] h-[27px]
      object-contain'/>
      <p className='font-poppons font-normal text-[18px]
      leading-[32px] text-white my-10'>{content}</p>
      <div className='flex flex-col items-center'>
        <img src={img} alt={name}
        className='w-[100px] h-[100px] rounded-full
        transition duration-100 ease-in-out hover:scale-150 onclick:scale-150'/>
        <div className='flex flex-col ml-4 items-center space-y-5'>
        <h4 className='font-poppins
        font-semibold text-[20px] leading-[32px] text-white'>{name}</h4>
        <p className='font-poppins
        font-normal text-[16px] leading-[24px] text-dimWhite'>{title}</p>
        {link &&
        <Button styles='max-w-[400px]' onClick={() => window.open(link)} className='font-poppins
        font-normal text-[16px] leading-[24px] text-dimWhite' text='Personal Website'/>}
        </div>
      </div>
    </div>
  );

export default PersonalInfo;