import md5 from 'md5';

import {
  PROCESS_CSV,
  CSV_PROCESSED,

  UPLOAD_CSV,
  CSV_UPLOADED,
  CSV_UPLOAD_ERROR
} from '../actions/csv';

export default function createReducer(initialState = {}) {
  return function update(state = initialState, action) {
    const { type } = action || {};

    switch(type) {
    case PROCESS_CSV:
      return {
        ...state,
        parsing: true
      };
    case CSV_PROCESSED:
      return {
        ...state,
        parsing: true,
        processedCsv: action.output,
        processedCsvHash: md5(action.output),
        errors: action.errors
      }

    case UPLOAD_CSV:
      return {
        ...state,
        uploading: true,
        file: action.file
      };

    case CSV_UPLOADED:
      return {
        ...state,
        uploading: false,
        uploadedCsv: action.csvContents,
        uploadedCsvHash: md5(action.csvContents)
      };
    case CSV_UPLOAD_ERROR:
      return {
        ...state,
        uploading: false,
        uploadedCsv: null,
        uploadedCsvHash: null,
        error: action.error
      };

    default:
      return state;
    }
  }
}
