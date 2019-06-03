import React from 'react';

import { connect } from 'react-redux';

import Settings from '../components/settings';

import {
  uploadCsv,
  processCsv
} from '../actions/csv';

import {
  importMembers,
  filterMembers,
  resetAllData
} from '../actions/members';

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUploadCsv: (file) => {
      return dispatch(uploadCsv(file));
    },
    onProcessCsv: (csvContents) => {
      return dispatch(processCsv(csvContents));
    },
    onImportMembers: (processedCsv) => {
      return dispatch(importMembers(processedCsv));
    },
    onFilterMembers: (filter) => {
      return dispatch(filterMembers(filter));
    },
    onResetAllData: () => {
      return dispatch(resetAllData());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
