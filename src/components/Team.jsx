import { pInfo } from '../constants';
import styles from '../style';
import PersonalInfo from './PersonalInfo';

const Team = () =>
  (
    <section id='team' className={`${styles.paddingY}
    ${styles.flexCenter} flex-col
    relative`}>
      <div className='w-full flex justify-between
      items-center flex-col
      sm:mb-16 mb-6 relative z-[1]'>
        <h1 className={styles.heading2}>Developed by:</h1>
      </div>
      <div className='flex flex-col
      sm:justify-start justify-center w-full
      feedback-container relative z-[1]'>
        {pInfo.map((card) => (
          <PersonalInfo key={card.id} {...card}/>
        ))}
      </div>
    </section>
  )

export default Team;
