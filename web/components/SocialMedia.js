import React from 'react';
import { SocialMediaIconsReact } from 'social-media-icons-react';
import styles from './SocialMedia.module.css';

function SocialMedia(props) {
  const { links } = props;
  const iconSize = '40';

  return (
    <div className={styles.socialWrapper}>
      <h4>Follow ORI on social media</h4>
      <div className={styles.socialContainer}>
        {links.facebookUrl ? (
          <SocialMediaIconsReact
            borderColor="rgba(0,0,0,0.25)"
            borderWidth="0"
            borderStyle="solid"
            icon="facebook"
            iconColor="rgba(255,255,255,1)"
            backgroundColor="#1977f2"
            iconSize="5"
            roundness="20%"
            url={links.facebookUrl}
            size={iconSize}
          />
        ) : (
          ''
        )}
        {links.twitterUrl ? (
          <SocialMediaIconsReact
            borderColor="rgba(0,0,0,0.25)"
            borderWidth="0"
            borderStyle="solid"
            icon="twitter"
            iconColor="rgba(255,255,255,1)"
            backgroundColor="#1c9bef"
            iconSize="5"
            roundness="20%"
            url={links.twitterUrl}
            size={iconSize}
          />
        ) : (
          ''
        )}
        {links.youtubeUrl ? (
          <SocialMediaIconsReact
            borderColor="rgba(0,0,0,0.25)"
            borderWidth="0"
            borderStyle="solid"
            icon="youtube"
            iconColor="rgba(255,255,255,1)"
            backgroundColor="#f00"
            iconSize="5"
            roundness="20%"
            url={links.youtubeUrl}
            size={iconSize}
          />
        ) : (
          ''
        )}
        {links.instagramUrl ? (
          <SocialMediaIconsReact
            borderColor="rgba(0,0,0,0.25)"
            borderWidth="0"
            borderStyle="solid"
            icon="instagram"
            iconColor="rgba(255,255,255,1)"
            backgroundColor="#f09433"
            iconSize="5"
            roundness="20%"
            url={links.instagramUrl}
            size={iconSize}
          />
        ) : (
          ''
        )}
        {links.linkedinUrl ? (
          <SocialMediaIconsReact
            borderColor="rgba(0,0,0,0.25)"
            borderWidth="0"
            borderStyle="solid"
            icon="linkedin"
            iconColor="rgba(255,255,255,1)"
            backgroundColor="#0b65c2"
            iconSize="5"
            roundness="20%"
            url={links.linkedinUrl}
            size={iconSize}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default SocialMedia;
