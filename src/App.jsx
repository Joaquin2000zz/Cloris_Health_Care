import React from 'react';
import './style/Model.css';
import styles from './style';
import './style/index.css'
import {
    YOLO, ModelDescription,
    Footer, Introduction, Model, NavBar, Description, Team
} from './components';


const App = () =>
(
    <div className='bg-primary w-full overflow-hidden'>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`} >
                <NavBar />
            </div>
        </div>
        <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Introduction />
            </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Description />
                <YOLO />
                <Team />
                <ModelDescription />
                <Model />
                <Footer />
            </div>
        </div>
        <div>
        </div>
    </div>
);

export default App;
