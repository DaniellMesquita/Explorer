import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './Dashboard.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import {
  ActivityPanel,
  BountiesPanel,
  SubmissionsPanel,
  UserStats
} from 'containers';

import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { actions as activityActions } from 'public-modules/Activity';
import { actions as bountiesPanelActions } from 'containers/BountiesPanel/reducer';
import { actions as submissionsPanelActions } from 'containers/SubmissionsPanel/reducer';

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    props.loadActivityPanel(props.public_address);
    props.loadBountiesPanel();
    props.loadSubmissionsPanel();
  }

  render() {
    var settings = {
      dots: true,
      arrows: false
    };
    return (
      <div>
        <div className={`container-fluid ${styles.desktopContainer}`}>
          <div className="row center-xs">
            <div className="col-xs-10">
              <UserStats className={styles.statsContainer} />
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-xs-5">
              <BountiesPanel
                className={styles.bountiesPanel}
                bodyClass={styles.bodyClass}
              />
            </div>
            <div className="col-xs-5">
              <ActivityPanel
                className={styles.activityPanel}
                bodyClass={styles.bodyClass}
              />
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-xs-10">
              <SubmissionsPanel
                className={styles.submissionsPanel}
                bodyClass={styles.bodyClass}
              />
            </div>
          </div>
        </div>
        <div className={styles.mobileContainer}>
          <UserStats className={styles.statsContainer} />
          <Slider {...settings}>
            <div>
              <BountiesPanel bodyClass={styles.bodyClass} />
            </div>
            <div>
              <ActivityPanel bodyClass={styles.bodyClass} />
            </div>
            <div>
              <SubmissionsPanel bodyClass={styles.bodyClass} />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentUser = getCurrentUserSelector(state);
  const { public_address } = currentUser;

  return {
    public_address
  };
};

const Dashboard = compose(
  connect(
    mapStateToProps,
    {
      loadSubmissionsPanel: submissionsPanelActions.loadSubmissionsPanel,
      loadBountiesPanel: bountiesPanelActions.loadBountiesPanel,
      loadActivityPanel: activityActions.loadActivity
    }
  )
)(DashboardComponent);

export default Dashboard;
