import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import imageUrlBuilder from '@sanity/image-url';
import styles from './Hero.module.css';
import client from '../../client';
import SimpleBlockContent from '../SimpleBlockContent';
import Cta from '../Cta';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

function Hero(props) {
  const { heading, subheading, backgroundImage, tagline, ctas } = props;
  const router = useRouter();
  const isHomepage = router.asPath === '/';
  const isPri = router.asPath === '/pri' || router.asPath === '/pri/';

  const style = backgroundImage
    ? {
        backgroundImage: `url("${urlFor(backgroundImage).width(2000).auto('format').url()}")`
      }
    : {};

  return (
    <div className={isPri ? styles.root + ' ' + styles.tall : styles.root} style={style}>
      <div className={isHomepage ? styles.content + ' ' + styles.homepageBanner : styles.content}>
        <h1 className={styles.title}>{heading}</h1>
        {subheading && <h2 className={styles.subtitle}>{subheading}</h2>}
        {tagline && (
          <div className={styles.tagline}>
            <SimpleBlockContent blocks={tagline} />
          </div>
        )}
        {ctas && (
          <div className={isHomepage ? styles.ctas + ' ' + styles.homepageBanner : styles.ctas}>
            {ctas.map((cta) => (
              <Cta {...cta} key={cta._key} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Hero.propTypes = {
  heading: PropTypes.string,
  backgroundImage: PropTypes.object,
  tagline: PropTypes.array,
  ctas: PropTypes.arrayOf(PropTypes.object)
};

export default Hero;
