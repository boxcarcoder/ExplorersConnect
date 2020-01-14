import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  if (alerts !== null && alerts.length > 0) {
    return alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ));
  }

  return null;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

//mapping the redux state (array of alerts in reducer) to a usable prop
const mapStateToProps = state => ({
  alerts: state.alert //propName: state.reducer
});

export default connect(mapStateToProps)(Alert);
