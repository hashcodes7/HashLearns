import React, { useState, useEffect, useCallback } from 'react';
import styles from './ComicCarousel.module.css';

/**
 * Normalizes image input: accepts imported modules, strings, require() calls, or objects.
 */
const normalizeImage = (item, index) => {
  if (!item) return { src: '', alt: `Panel ${index + 1}` };
  if (typeof item === 'string') return { src: item, alt: `Panel ${index + 1}` };

  let srcUrl = item;
  if (typeof item === 'object') {
    if (item.src) srcUrl = item.src;
    else if (item.default) {
      srcUrl = typeof item.default === 'string' ? item.default : item.default.src || item.default;
    }
  }

  return {
    src: typeof srcUrl === 'string' ? srcUrl : String(srcUrl),
    alt: item.alt || `Panel ${index + 1}`
  };
};

export default function ComicCarousel({
  folder,
  images = [],
  filter,
  loop = false
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Determine source images (supports Webpack require.context, filtered selection, or array)
  let rawImages = [];
  if (folder && typeof folder === 'function' && typeof folder.keys === 'function') {
    try {
      const keys = folder.keys();

      // Case 1: Specific filenames specified as string array in images prop
      if (Array.isArray(images) && images.length > 0 && typeof images[0] === 'string') {
        rawImages = images.map((name) => {
          const matchKey = keys.find((k) => k.endsWith(name) || k === `./${name}`);
          if (matchKey) {
            const mod = folder(matchKey);
            return mod?.default || mod;
          }
          return name;
        });
      }
      // Case 2: Filter by keyword string (e.g. filter="comic1")
      else if (filter && typeof filter === 'string') {
        const filteredKeys = keys
          .filter((k) => k.toLowerCase().includes(filter.toLowerCase()))
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

        rawImages = filteredKeys.map((key) => {
          const mod = folder(key);
          return mod?.default || mod;
        });
      }
      // Case 3: All images in assets folder
      else {
        const sortedKeys = keys.sort((a, b) => 
          a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
        );
        rawImages = sortedKeys.map((key) => {
          const mod = folder(key);
          return mod?.default || mod;
        });
      }
    } catch (err) {
      console.error('ComicCarousel require.context error:', err);
    }
  } else if (Array.isArray(images)) {
    rawImages = images;
  }

  const normalizedImages = rawImages.map(normalizeImage);
  const totalImages = normalizedImages.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev < totalImages - 1) return prev + 1;
      return loop ? 0 : prev;
    });
  }, [totalImages, loop]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev > 0) return prev - 1;
      return loop ? totalImages - 1 : prev;
    });
  }, [totalImages, loop]);

  // Keyboard arrow keys navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape' && lightboxImage) setLightboxImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, lightboxImage]);

  if (totalImages === 0) return null;

  const currentImg = normalizedImages[currentIndex];
  const isPrevDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === totalImages - 1;

  return (
    <div className={styles.carouselContainer}>
      {/* Main Image Viewport Frame */}
      <div className={styles.imageFrame}>
        {/* Top-Left Brand Watermark */}
        <div className={styles.brandBadge}>
          hashcomics😋
        </div>

        {/* Top-Right Counter Badge Pill (1 / 3) */}
        <div className={styles.counterBadge}>
          {currentIndex + 1} / {totalImages}
        </div>

        {/* Comic Image */}
        <img
          src={currentImg.src}
          alt={currentImg.alt}
          className={styles.comicImage}
          onClick={() => setLightboxImage(currentImg)}
          title="Click to view full screen"
        />

        {/* Bottom-Center Dots Pagination */}
        {totalImages > 1 && (
          <div className={styles.dotsContainer}>
            {normalizedImages.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to panel ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Controls Bar: Prev < | Thumbnails | Next > */}
      <div className={styles.bottomBar}>
        <button
          className={styles.prevBtn}
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          Prev &lt;
        </button>

        {/* Thumbnail Preview Strip */}
        {totalImages > 1 && (
          <div className={styles.thumbStrip}>
            {normalizedImages.map((img, idx) => (
              <div
                key={idx}
                className={`${styles.thumbBox} ${idx === currentIndex ? styles.thumbBoxActive : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <img src={img.src} alt={img.alt} className={styles.thumbImg} />
              </div>
            ))}
          </div>
        )}

        <button
          className={styles.nextBtn}
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          Next &gt;
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxImage && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setLightboxImage(null)}
        >
          <button
            className={styles.modalCloseBtn}
            onClick={() => setLightboxImage(null)}
          >
            ✕
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className={styles.modalImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
