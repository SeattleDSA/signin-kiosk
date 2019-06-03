import React, { useState}  from 'react';
import _ from 'lodash';

import {
  Pane,
  Text,
  Heading,
  Table,
  Button,
  Icon,
  Dialog,
  Alert
} from 'evergreen-ui';

const {
  Head,
  Body,
  Cell,
  TextCell,
  TextHeaderCell,
  SearchHeaderCell,
  Row
} = Table;

const PAGE_SIZE = 25;

export default function Signin(props) {
  const {
    filteredMembers,
    filter,
    checkins,
    onUpdateSearch,
    onCreateCheckIn,
    onRemoveCheckIn,
    error
  } = props;

  const [maxMembers, setMaxMembers] = useState(PAGE_SIZE);

  function increaseMaxMembers() {
    setMaxMembers(maxMembers + PAGE_SIZE);
  }

  return (
    <Pane>
      <Heading>Signin</Heading>
      <Heading size={400}>
        {_.size(filteredMembers)} members ({filter})
      </Heading>
      <Heading size={400}>{_.size(checkins)} checked in</Heading>
      {error ? (<Alert intent="danger">{_.get(error, 'message', error)}</Alert>) : null}
      <Table>
        <Head>
          <SearchHeaderCell onChange={onUpdateSearch} />
          <TextHeaderCell>First Name</TextHeaderCell>
          <TextHeaderCell>Last Name</TextHeaderCell>
          <TextHeaderCell>Email</TextHeaderCell>
          <TextHeaderCell>Status</TextHeaderCell>
        </Head>
        <Body>
          <Members
            members={filteredMembers}
            max={maxMembers}
            checkins={checkins}
            onCreateCheckIn={onCreateCheckIn}
            onRemoveCheckIn={onRemoveCheckIn} />
        </Body>
      </Table>
      <Button onClick={increaseMaxMembers}>Show More</Button>
    </Pane>
  );
}

function Members({ members, max, checkins, onCreateCheckIn, onRemoveCheckIn }) {
  const [dialogOpenFor, setDialogOpenFor] = useState(null);

  return _.map(_.take(members, max), (member) => {
    const checkedIn = checkins[member.nationbuilder_id];

    return (
      <React.Fragment>
        <Row isSelectable onSelect={() => setDialogOpenFor(member.nationbuilder_id)} key={member.nationbuilder_id}>
          <TextCell>{member.full_name}</TextCell>
          <TextCell>{member.first_name}</TextCell>
          <TextCell>{member.last_name}</TextCell>
          <TextCell>{member.email}</TextCell>
          <TextCell>{checkedIn ? (<Icon icon="tick-circle" color="success" marginRight={16} />) : null}</TextCell>
        </Row>
        <MemberDialog
          isOpen={dialogOpenFor === member.nationbuilder_id}
          member={member}
          onClose={() => setDialogOpenFor(null)}
          checkedIn={checkedIn}
          onCreateCheckIn={onCreateCheckIn}
          onRemoveCheckIn={onRemoveCheckIn} />
      </React.Fragment>
    );
  });
}

function MemberDialog({ isOpen, member, onClose, checkedIn, onRemoveCheckIn, onCreateCheckIn }) {
  function onConfirm() {
    if(checkedIn) {
      onRemoveCheckIn(member);
    } else {
      onCreateCheckIn(member);
    }

    onClose();
  }

  return (
    <Dialog
      isShown={isOpen}
      title={checkedIn ? `Undo Checkin for ${member.full_name}` : `Check in ${member.full_name}`}
      onConfirm={onConfirm}
      onCloseComplete={onClose}
      confirmLabel={checkedIn ? "Undo Checkin" : "Check In"}
    >
      {checkedIn ? "Would you like to undo this member's checkin?" : "Would you like to check this member in?"}
    </Dialog>
  );
}
