import parse from 'csv-parse';

export const PROCESS_CSV = "PROCESS_CSV";
export const CSV_PROCESSED = "CSV_PROCESSED";

export function processCsv(csvContents) {
  const promise = new Promise((resolve, reject) => {
    parse(csvContents, { skip_lines_with_error: true }, (err, output) => {
      if(output && (output.length > 1)) {
        const headers = output[0];

        output = _.chain(output)
          .tail()
          .map((record) => {
            return _.zipObject(headers, record);
          })
          .value();
        resolve({ output });
      } else {
        reject(new Error("An error occurred"));
      }
    });
  });

  return {
    type: PROCESS_CSV,
    sideEffect: {
      promise,
      resolveType: CSV_PROCESSED
    }
  };
}

export const UPLOAD_CSV = "UPLOAD_CSV";
export const CSV_UPLOADED = "CSV_UPLOADED";
export const CSV_UPLOAD_ERROR = "CSV_UPLOAD_ERROR";

export function uploadCsv(file) {
  const promise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = function (e) {
      resolve({ csvContents: e.target.result });
    }
    reader.onerror = function (error) {
      reject(error);
    }
  });

  return {
    type: UPLOAD_CSV,
    sideEffect: {
      promise,
      resolveType: CSV_UPLOADED,
      rejectType: CSV_UPLOAD_ERROR
    }
  };
}
