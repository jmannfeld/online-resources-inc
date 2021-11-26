import React from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import styles from './YoutubeEmbed.module.css';

function YoutubeEmbed(props) {
  const { heading, position, text, url } = props;
  const videoId = getYouTubeId(url);

  return (
    <div className={styles.youtubeEmbedContainer}>
      <h2 className={styles.youtubeHeading}>{heading}</h2>
      {position.toLowerCase() === 'right' ? (
        <div className={styles.youtubeFlex}>
          <p className={styles.youtubeText}>{text}</p>
          <YouTube videoId={videoId} className={styles.video} />
        </div>
      ) : (
        <div className={styles.youtubeFlex}>
          <YouTube videoId={videoId} className={styles.video} />
          <p className={styles.youtubeText}>{text}</p>
        </div>
      )}
    </div>
  );
}

// teamList.propTypes = {
//   title: PropTypes.string.isRequired,
//   route: PropTypes.shape({
//     slug: PropTypes.shape({
//       current: PropTypes.string
//     })
//   }),
//   link: PropTypes.string
// }

export default YoutubeEmbed;
