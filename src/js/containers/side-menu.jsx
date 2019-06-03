import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';

import SideMenu from '../components/side-menu';

function mapStateToProps(state) {
  return {
    ..._.get(state, 'router.location', {})
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
