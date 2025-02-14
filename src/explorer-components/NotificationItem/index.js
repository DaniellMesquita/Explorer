import React from 'react';
import PropTypes from 'prop-types';
import styles from './NotificationItem.module.scss';
import { notification_template } from 'utils/constants';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text } from 'components';
import { LinkedAvatar } from 'explorer-components';
import moment from 'moment';
import intl from 'react-intl-universal';

const NotificationItem = props => {
  const {
    createdAt,
    title,
    type,
    userAddress,
    profileImage,
    notifierWidth
  } = props;
  const { message, icon } = notification_template[type];
  const formattedTime = moment.utc(createdAt, 'YYYY-MM-DDThh:mm:ssZ').fromNow();

  let notifierClass = `${styles[notifierWidth]} ${styles.notifier}`;

  return (
    <div className={styles.container}>
      <div className={notifierClass}>
        {userAddress ? (
          <LinkedAvatar img={profileImage} hash={userAddress} />
        ) : (
          <FontAwesomeIcon icon={icon} className={styles.iconStyles} />
        )}
      </div>
      <div className={styles.notificationMain}>
        <div className={styles.text}>
          <Text color="black" typeScale="Small" inline>
            {intl.get(message).d(message)}
          </Text>
          <Text color="black" weight="fontWeight-bold" typeScale="Small" inline>
            {' ' + title}
          </Text>
        </div>
        <div className={styles.time}>
          <Text color="defaultGrey" typeScale="Small">
            {formattedTime}
          </Text>
        </div>
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  title: PropTypes.string,
  notifierWidth: PropTypes.oneOf(['small', 'large'])
};

NotificationItem.defaultProps = {
  notifierWidth: 'small'
};

export default NotificationItem;
