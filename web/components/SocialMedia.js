import React from 'react';
import { SocialIcon } from 'react-social-icons';
import styles from './SocialMedia.module.css';

function SocialMedia(props) {
  const { links } = props;
  return (
    <div className={styles.socialWrapper}>
      <h3>Follow ORI on Social Media</h3>
      {links && (
        <div className={styles.socialContainer}>
          {links.facebookUrl ? <SocialIcon url={links.facebookUrl} /> : ''}
          {links.twitterUrl ? <SocialIcon url={links.twitterUrl} /> : ''}
          {links.youtubeUrl ? <SocialIcon url={links.youtubeUrl} /> : ''}
          {links.instagramUrl ? <SocialIcon url={links.instagramUrl} bgColor="#F77737" /> : ''}
          {links.linkedinUrl ? <SocialIcon url={links.linkedinUrl} /> : ''}
        </div>
      )}
    </div>
  );
}

export default SocialMedia;
