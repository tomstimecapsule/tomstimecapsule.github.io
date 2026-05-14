import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function ContactPage() {
  return (
    <Layout>
      {/* <main className={clsx(styles.heroBanner)}>
        <div className={clsx(styles.overlayContainer)}>
          <img src="./img/contactBanner.png" alt="Contact Banner" className={clsx(styles.bannerImage)} />
          <div className={clsx(styles.overlayText)}>Contact.</div>
        </div>
      </main> */}
      <main>
        <div className={clsx(styles.parentContainer)}>
          <div className={clsx(styles.contactContainer)}>
            <h1 className={clsx(styles.pageTitle)}>Contact.</h1>
            <p className={styles.subTitle}>Want to get in touch? Feel free to drop me a message</p>          
            <div className={styles.contactContainerSplit}>

               <form className={styles.contactForm}
                action="https://formspree.io/f/mnndbpqb"
                // class="fs-form"
                target="_top"
                method="POST"
                >
                <div className={styles.contactEntrySplit}>
                    <input type="text" placeholder="Name*" id="name" name="name" required/>
                    <input type="email" placeholder='Email*' id="email" name="email" required />
                </div>
                <textarea id="message" placeholder="Your message*" name="message" rows="4" required></textarea>
                <label className={styles.formConsent}>
                  <input type="checkbox" required />
                  By checking this box, I consent to the processing of my personal data for the purpose of responding to my message. 
                  My data is handled securely via <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Formspree</a> and is protected under the General Data Protection Regulation (GDPR) and other applicable data protection laws.
                </label>
                <button type="submit" className={`${styles.subscribeButton} ${styles.submitButton}`}>Send <i className="fa-regular fa-envelope"></i></button>       

      
              </form>
            </div>        
              
          </div>
        </div>
      </main>
    </Layout>
  );
}