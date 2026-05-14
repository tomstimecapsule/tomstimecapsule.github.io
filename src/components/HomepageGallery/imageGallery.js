import React from "react";
import styles from "./imageGallery.module.css"; // CSS for styling the gallery
import { FaInstagram } from "react-icons/fa"; // Import Instagram icon

import image01 from '@site/static/img/gallery/gallery-1.png';
import image02 from '@site/static/img/gallery/gallery-2.png';
import image03 from '@site/static/img/gallery/gallery-3.png';
import image04 from '@site/static/img/gallery/gallery-4.png';
import image06 from '@site/static/img/gallery/gallery-6.png';
import image08 from '@site/static/img/gallery/gallery-8.png';
import image09 from '@site/static/img/gallery/gallery-9.png';
import image11 from '@site/static/img/gallery/gallery-11.png';
import image12 from '@site/static/img/gallery/gallery-12.png';
import image13 from '@site/static/img/gallery/gallery-13.png';
import image14 from '@site/static/img/gallery/gallery-14.png';
import image15 from '@site/static/img/gallery/gallery-15.png';
import image16 from '@site/static/img/gallery/gallery-16.png';
import image17 from '@site/static/img/gallery/gallery-17.png';


const images = [
  { src: image13, link: "https://www.instagram.com/p/DBO--Ahsnu1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image06, link: "https://www.instagram.com/p/CwOE0cLMHnq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image12, link: "https://www.instagram.com/p/C81j0a-sG9h/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image15, link: "https://www.instagram.com/reel/DEfl4MJMzab/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image14, link: "https://www.instagram.com/p/DDu20cNRI1Y/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image16, link: "https://www.instagram.com/p/DDhCm47oXMF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image17, link: "https://www.instagram.com/p/DEH0sL0IJkV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image01, link: "https://www.instagram.com/p/CxGswdbMKAU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image11, link: "https://www.instagram.com/p/C-0CkO4MdmO/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image02, link: "https://www.instagram.com/p/CxYsByusSGi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image03, link: "https://www.instagram.com/p/CyePIT9MshZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image09, link: "https://www.instagram.com/p/CygiKgWMiik/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image04, link: "https://www.instagram.com/p/CxtJ1_6MN7j/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { src: image08, link: "https://www.instagram.com/p/CxnvdwBMubc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },

];


const GalleryGrid = () => {
  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <a
          key={index}
          href={image.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageWrapper}
        >
          <img
            src={image.src}
            alt={`Gallery Image ${index + 1}`}
            className={styles.image}
          />
          <div className={styles.overlay}>
            <FaInstagram className={styles.icon} />
          </div>
        </a>
      ))}
    </div>
  );
};

export default GalleryGrid;
