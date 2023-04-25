import '../style/loader.css';
import styles from '../style';
import { apple } from '../style/assets';

const Loader = (props) =>
    (
        <div className='wrapper' {... props}>
            <img src={apple} className='spinner' />
            <p className={styles.paragraph}>{ props.children }</p>
        </div>
    );

export default Loader;
