import React, { useState } from 'react';

import {
  Pane,
  Card,
  Text,
  Heading,
  FilePicker,
  Alert,
  SelectMenu,
  Button,
  Dialog
} from 'evergreen-ui';

export default function Settings(props) {
  const {
    onUploadCsv,
    onProcessCsv,
    onImportMembers,
    onFilterMembers,
    onResetAllData
  } = props;

  return (
    <Pane>
      <Heading>Settings</Heading>
      <MemberStats
        {...props.members}
        processedCsvHash={props.csv.processedCsvHash}
        processedCsv={props.csv.processedCsv}
        onImportMembers={onImportMembers}
        onFilterMembers={onFilterMembers}/>
      <Uploader
        {...props.csv}
        onUploadCsv={onUploadCsv}
        onProcessCsv={onProcessCsv} />
      <Reset onResetAllData={onResetAllData} />
    </Pane>
  );
}

function Uploader(props) {
  const {
    onUploadCsv,
    onProcessCsv,
    processedCsv,
    processedCsvHash,
    uploadedCsv,
    uploadedCsvHash,
    uploading,
    parsing,
    errors,
    error
  } = props;

  const [lastProcessedCsvHash, setLastProcessedCsvHash] = useState(null);
  const [lastUploadedCsvHash, setLastUploadedCsvHash] = useState(null);

  let message = null;

  if(!error && !uploading && !parsing && uploadedCsvHash && (lastUploadedCsvHash !== uploadedCsvHash)) {
    onProcessCsv(uploadedCsv);

    setLastUploadedCsvHash(uploadedCsvHash);
  } else if(processedCsvHash && (lastProcessedCsvHash !== processedCsvHash)) {
    message = (
      <Alert intent="success" title={`Successfully imported ${processedCsv.length} members`} />
    );

    setTimeout(() => {
      setLastProcessedCsvHash(processedCsvHash);
    }, 5000);
  }

  return (
    <React.Fragment>
      {message}

      <Card margin={24} elevation={3}>
        <Heading size={300}>Import CSV</Heading>
        <FilePicker
          width={250}
          onChange={uploadHandler(onUploadCsv)}
        />
      </Card>
    </React.Fragment>
  );
}

function uploadHandler(onUploadCsv) {
  return (files) => {
    if(files && files[0]) {
      onUploadCsv(files[0]);
    }
  };
}

function MemberStats(props) {
  const {
    allMembers,
    filteredMembers,
    processedCsvHash,
    processedCsv,
    onImportMembers,
    filter,
    onFilterMembers
  } = props;

  const [lastProcessedCsvHash, setLastProcessedCsvHash] = useState(null);

  if(processedCsvHash && (lastProcessedCsvHash !== processedCsvHash)) {
    onImportMembers(processedCsv);

    setLastProcessedCsvHash(processedCsvHash);
  }

  return (
    <Card margin={24} elevation={3}>
      <Heading size={300}>Imported Members</Heading>
      <div>
        <Text>
          Total Members: {allMembers.length}
        </Text>
      </div>
      <div>
        <Text>
          Filtered Members: {filteredMembers.length}
        </Text>
      </div>
    <SelectMenu
      title="Select name"
      options={
        ['All', 'A-M', 'N-Z']
          .map(label => ({ label, value: label }))
      }
      selected={filter}
      onSelect={item => onFilterMembers(item.value)}
    >
      <Button>{filter}</Button>
    </SelectMenu>
    </Card>
  );
}

function Reset({ onResetAllData }) {
  const [dialogVisible, setDialogVisible] = useState(false);

  function reset() {
    setDialogVisible(false);
    onResetAllData();
  }

  return (
    <Card margin={24} elevation={3}>
      <Heading size={300}>Reset All Data</Heading>
      <Button appearance="danger" onClick={() => setDialogVisible(true)}>Reset all data</Button>
      <Dialog
        isShown={dialogVisible}
        title="Confirm Reset All Data"
        confirmLabel="Reset All Data"
        intent="danger"
        onConfirm={reset}>
        Are you sure you want to reset all locally stored data?
      </Dialog>
    </Card>
  );
}
