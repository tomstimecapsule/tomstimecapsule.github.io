import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import GalleryGrid from '@site/src/components/HomepageGallery/imageGallery.js';
import styles from './index.module.css';
import AboutMe from '@site/src/components/AboutMe/aboutMe.jsx'

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Tom's Time Capsule`}
      description="Landscape, travel, and lifestyle photography">
      <main>
        <div className={styles.mainContainer}>
          <AboutMe/>
          <h1 className="page-title" style={{marginTop: '3rem'}}>Gallery.</h1>
          <p className={styles.pageDescription}>Landscape, Travel, and Lifestyle Photography</p>
          <GalleryGrid />
        </div>
      </main>
    </Layout>
  );
}
