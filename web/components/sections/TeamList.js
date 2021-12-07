import React from 'react';
import PropTypes from 'prop-types';
import imageUrlBuilder from '@sanity/image-url';
import client from '../../client';
import styles from './TeamList.module.css';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

function TeamList(props) {
  const { subtitle, members } = props;

  return (
    <div className={styles.teamListContainer}>
      {subtitle && <h2 className={styles.memberPageSubtitle}>{subtitle}</h2>}
      <div className={styles.teamList}>
        {members.map((member) => {
          return (
            <div className={styles.memberItem} key={member.name}>
              <img className={styles.memberImage} src={urlFor(member.headshot)}></img>
              <div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <h4 className={styles.memberTitle}>{member.title}</h4>
                <p className={styles.memberBio}>{member.bio}</p>
              </div>
            </div>
          );
        })}
      </div>
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

export default TeamList;
