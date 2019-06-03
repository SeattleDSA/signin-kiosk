import React from 'react';

import { connect } from 'react-redux';

import Signin from '../components/signin';

import {
  search,
  createCheckIn,
  removeCheckIn
} from '../actions/members';

function mapStateToProps(state) {
  return {
    ...state.members
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateSearch: (query) => dispatch(search(query)),
    onCreateCheckIn: (member) => dispatch(createCheckIn(member)),
    onRemoveCheckIn: (member) => dispatch(removeCheckIn(member))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
