import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styles from './masonryGallery.module.css';

const MasonryGallery = ({ images, columns = 2 }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = images.map(item => ({
    src: typeof item.image === 'object' ? item.image.src : item.image,
    alt: item.title,
  }));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div
        className={styles.masonry}
        style={{ columnCount: columns }}
      >
        {images.map((item, index) => (
          <div
            className={styles.grid}
            key={index}
            style={{ color: item.textColor, cursor: 'pointer' }}
            onClick={() => openLightbox(index)}
          >
            <img src={item.image} alt={item.title} />
            <div className={styles.grid__body} style={{ color: item.textColor }}>
              <div className={styles.relative}>
                <h1 className={styles.grid__title}>{item.title}</h1>
                <p className={styles.grid__author}>{item.author}</p>
              </div>
              <div className={styles.mt_auto}>
                <span className={styles.grid__tag}>{item.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
      />
    </>
  );
};

export default MasonryGallery;
