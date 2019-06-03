import _ from 'lodash';

export const IMPORT_MEMBERS = "IMPORT_MEMBERS";

export const ALL_MEMBERS_KEY = "members";
export const FILTER_KEY = "memberFilter";
export const CHECKINS_KEY = `checkins_${(new Date()).toDateString()}`

export function importMembers(processedCsv) {
  const members = _.chain(processedCsv)
        .map((record) => {
          return _.pick(record, ['first_name', 'last_name', 'full_name', 'email', 'nationbuilder_id']);
        }).sortBy((member) => {
          return _.lowerCase(member.last_name);
        }).value();

  window.localStorage.setItem(ALL_MEMBERS_KEY, JSON.stringify(members));
2
  return {
    type: IMPORT_MEMBERS,
    members,
    processedCsv
  };
}

export const FILTER_MEMBERS = "FILTER_MEMBERS";

export function filterMembers(filter) {
  window.localStorage.setItem(FILTER_KEY, filter);

  return {
    type: FILTER_MEMBERS,
    filter
  };
}

export const SEARCH = "SEARCH";
export const DO_SEARCH = "DO_SEARCH";

let _searchTimeout = null;

export function search(search) {
  const timeoutGenerator = (dispatch) => {
    return setTimeout(() => {
      dispatch({
        type: DO_SEARCH,
        search
      });
    }, 1000);
  };

  return {
    type: SEARCH,
    search,
    sideEffect: {
      timeoutGenerator
    }
  };
}

export const CREATE_CHECKIN = "CREATE_CHECKIN";
export const CHECKIN_CREATED = "CHECKIN_CREATED";

export const CHECKIN_ERROR = "CHECKIN_ERROR";

export function createCheckIn(member) {
  function timeoutGenerator(dispatch) {
    return setTimeout(() => {
      try {
        const checkins = JSON.parse(window.localStorage.getItem(CHECKINS_KEY) || "{}");
        checkins[member.nationbuilder_id] = true;
        window.localStorage.setItem(CHECKINS_KEY, JSON.stringify(checkins));

        dispatch({
          type: CHECKIN_CREATED,
          member
        });
      } catch(error) {
        dispatch({
          type: CHECKIN_ERROR,
          error
        });
      }
    }, 0);
  }

  return {
    type: CREATE_CHECKIN,
    member,
    sideEffect: {
      timeoutGenerator
    }
  };
}

export const REMOVE_CHECKIN = "REMOVE_CHECKIN";
export const CHECKIN_REMOVED = "CHECKIN_REMOVED";

export function removeCheckIn(member) {
  function timeoutGenerator(dispatch) {
    return setTimeout(() => {
      try {
        const checkins = JSON.parse(window.localStorage.getItem(CHECKINS_KEY) || "{}");
        delete checkins[member.nationbuilder_id];
        window.localStorage.setItem(CHECKINS_KEY, JSON.stringify(checkins));

        dispatch({
          type: CHECKIN_REMOVED,
          member
        });
      } catch(error) {
        dispatch({
          type: CHECKIN_ERROR,
          error
        });
      }
    }, 0);
  }

  return {
    type: REMOVE_CHECKIN,
    member,
    sideEffect: {
      timeoutGenerator
    }
  };
}

export const RESET_ALL_DATA = "RESET_ALL_DATA";

export function resetAllData() {
  window.localStorage.clear();

  return {
    type: RESET_ALL_DATA
  };
}
