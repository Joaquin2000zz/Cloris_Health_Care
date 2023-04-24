import '../style/loader.css';
import styles from '../style';


const Loader = (props) =>
    (
        <div className='wrapper' {... props}>
            <div className='spinner'></div>
            <p className={styles.paragraph}>{ props.children }</p>
        </div>
    );

export default Loader;
