import styles from './aboutMe.module.css'
import profileImg2 from '@site/static/img/robotham_profile_2.jpg'

export default function AboutMe() {
    return (
        <main>
            <div className={styles.sectionContainer}>
                
                <div className={styles.profileText}>
                    <h1 className={styles.greeting}>Welcome.</h1>
                    <div className={styles.paragraph}>
                        <p>My name is Tom, a landscape, travel, and lifestyle photographer based in Bavaria, Germany.</p>
                        <p>Alongside the gallery you'll find a journal covering travel, gear, and my thoughts on photography.</p>
                    </div>
                    <p className={styles.tagline}><em>"Time is not our greatest resource — attention is."</em></p>
                    <div className={styles.buttonSep}>
                        <a className={styles.buttonLike} href="/blog">Journal <i className="fa-regular fa-pen-to-square"></i></a>
                        <a className={`${styles.buttonLike} ${styles.subscribeButtonLike}`} href="/contact">Contact <i className="fa-regular fa-bell"></i></a>
                    </div>
                </div>
                <img src={profileImg2} alt="Tom Robotham" />
            </div>
        </main>
    )
}
