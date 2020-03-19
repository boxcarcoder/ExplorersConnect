import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alertsState }) => {
  if (alertsState !== null && alertsState.length > 0) {
    return alertsState.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ));
  }

  return null;
};

Alert.propTypes = {
  alertsState: PropTypes.array.isRequired
};

//mapping the redux state (array of alerts in reducer) to a usable prop
const mapStateToProps = state => ({
  alertsState: state.alert //propName: state.reducer
});

export default connect(mapStateToProps)(Alert);
