import { close, clorisLogo, menu } from '../style/assets';
import { navLinks } from '../constants';
import styles from '../style';
import { useState } from 'react';


const NavBar = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <nav className='w-full flex py-6
    justify-between items-center navbar'>
      <div className='flex-1 flex flex-row justify-start items-center space-x-3'>
        <img className='w-[100%] h-[100%] max-w-[310px] max-h-[310px]'
        src={clorisLogo} alt='cloris'/>
        <p className={`${styles.paragraph} mt-5 text-[28px]`}>
        <span
            className='text-gradient'>Health Care </span >
        </p>
      </div>
      <ul className='list-none sm:flex
        hidden justify-end items-center
        flex-1'>
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins
                font-normal cursor-pointer
                text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}
                text-white`}>
            <a href={`#${nav.id}`}>
              {nav.title}
            </a>
          </li>
        ))}
      </ul>
      <div className='sm:hidden flex flex-1
        justify-end items-center'>
        <img
          src={toggle ? close : menu}
          alt='menu'
          className='w-[28px] h-[28px]
            object-contain'
          onClick={() => setToggle((prev) => !prev)}
        />
        <div
          className={`${toggle ? 'flex' : 'hidden'} p-6
            bg-black-gradient absolute top-20 right-0 mx-4
            my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className='list-none flex
          flex-col justify-end items-center
          flex-1'>
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins
                font-normal cursor-pointer
                text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mb-10'}
                text-white`}>
                <a href={`#${nav.id}`}>
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
