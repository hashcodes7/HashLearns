import React, { useState, useEffect, useCallback } from 'react';
import styles from './ComicStrip.module.css';

/**
 * Safely extracts a string URL from an image input.
 * If given a simple filename like 'git1.png', automatically pre-pends './assets/'.
 */
const getSrcString = (val) => {
  if (!val) return '';
  if (typeof val === 'string') {
    if (!val.includes('/') && !val.startsWith('data:') && !val.startsWith('http')) {
      return `./assets/${val}`;
    }
    return val;
  }
  if (typeof val === 'object') {
    if (val.default) {
      return getSrcString(val.default);
    }
    if (val.src) {
      return getSrcString(val.src);
    }
  }
  return String(val);
};

/**
 * Normalizes image input into { src, alt, desc }.
 */
const normalizeImage = (item, index, extraDesc) => {
  if (!item) return { src: '', alt: `Panel ${index + 1}`, desc: extraDesc };

  // Handle tuple format: ['git1.png', 'description text']
  if (Array.isArray(item)) {
    return {
      src: getSrcString(item[0]),
      alt: `Panel ${index + 1}`,
      desc: item[1] || extraDesc
    };
  }

  if (typeof item === 'string') {
    return { src: getSrcString(item), alt: `Panel ${index + 1}`, desc: extraDesc };
  }

  if (typeof item === 'object' && item !== null) {
    // Handle single-key dictionary: { 'git1.png': 'description text' }
    if (!item.src && !item.default) {
      const entries = Object.entries(item);
      if (entries.length > 0) {
        const [key, val] = entries[0];
        return {
          src: getSrcString(key),
          alt: `Panel ${index + 1}`,
          desc: typeof val === 'string' ? val : extraDesc
        };
      }
    }

    let desc = extraDesc || item.desc || item.description || item.caption;
    let rawSrc = item.src !== undefined ? item.src : item;
    let srcUrl = getSrcString(rawSrc);

    return {
      src: srcUrl,
      alt: item.alt || `Panel ${index + 1}`,
      desc: desc
    };
  }

  return { src: String(item), alt: `Panel ${index + 1}`, desc: extraDesc };
};

export default function ComicStrip({
  folder,
  images,
  items,
  descriptions = [],
  filter,
  loop = false,
  showThumbnails = true,
  ...customProps
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Parse custom direct JSX props like <ComicStrip git1="click on download" git2="click on install" />
  let inputList = [];
  
  if (items && ((Array.isArray(items) && items.length > 0) || typeof items === 'object')) {
    inputList = items;
  } else if (images && ((Array.isArray(images) && images.length > 0) || typeof images === 'object')) {
    inputList = images;
  } else if (Object.keys(customProps).length > 0) {
    inputList = Object.entries(customProps).map(([key, desc]) => {
      const srcName = (key.endsWith('.png') || key.endsWith('.jpg') || key.endsWith('.jpeg') || key.endsWith('.webp') || key.endsWith('.svg'))
        ? key
        : `${key}.png`;
      return { src: srcName, desc: typeof desc === 'string' ? desc : undefined };
    });
  }

  // Normalize dictionary map { 'git1.png': 'description' } into list of objects
  if (typeof inputList === 'object' && !Array.isArray(inputList) && inputList !== null) {
    inputList = Object.entries(inputList).map(([src, desc]) => ({ src, desc }));
  }

  // Determine source images (supports Webpack require.context, filtered selection, tuples, or arrays)
  let rawImages = [];
  if (folder && typeof folder === 'function' && typeof folder.keys === 'function') {
    try {
      const keys = folder.keys();

      const resolveKey = (candidate) => {
        if (typeof candidate !== 'string') return candidate;
        const cleanName = candidate.replace(/^\.\/assets\//, '').replace(/^\.\//, '');
        const matchKey = keys.find((k) => k.endsWith(cleanName) || k === `./${cleanName}`);
        if (matchKey) {
          const mod = folder(matchKey);
          return mod?.default || mod;
        }
        return candidate;
      };

      // Case 1: Array of items/tuples/objects/filenames passed
      if (Array.isArray(inputList) && inputList.length > 0) {
        rawImages = inputList.map((item) => {
          if (Array.isArray(item)) {
            return [resolveKey(item[0]), item[1]];
          }
          if (typeof item === 'object' && item !== null) {
            if (item.src) {
              return { ...item, src: resolveKey(item.src) };
            }
            // single key dictionary: { 'git1.png': 'desc' }
            const entries = Object.entries(item);
            if (entries.length > 0) {
              const [key, val] = entries[0];
              return { src: resolveKey(key), desc: val };
            }
          }
          return resolveKey(item);
        });
      }
      // Case 2: Filter by keyword string (e.g. filter="comic")
      else if (filter && typeof filter === 'string') {
        const filteredKeys = keys
          .filter((k) => {
             // Remove the leading './' to check the actual filename's initial
             const filename = k.replace(/^.\//, '').toLowerCase();
             return filename.startsWith(filter.toLowerCase());
          })
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
      console.error('ComicStrip require.context error:', err);
    }
  } else if (Array.isArray(inputList)) {
    rawImages = inputList;
  }

  const normalizedImages = rawImages.map((item, idx) => 
    normalizeImage(item, idx, descriptions[idx])
  );
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

      {/* Bottom Controls Bar: Prev < | Description / Thumbnails | Next > */}
      <div className={styles.bottomBar}>
        <button
          className={styles.prevBtn}
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          Prev &lt;
        </button>

        {/* Center Area: Description Text or Thumbnail Strip */}
        <div className={styles.centerControl}>
          {currentImg.desc ? (
            <div className={styles.descriptionText} title={currentImg.desc}>
              {currentImg.desc}
            </div>
          ) : showThumbnails && totalImages > 1 ? (
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
          ) : null}
        </div>

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

export { ComicStrip as ComicCarousel };
