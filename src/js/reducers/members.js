import {
  IMPORT_MEMBERS,
  FILTER_MEMBERS,
  DO_SEARCH,
  CREATE_CHECKIN,
  CHECKIN_CREATED,
  REMOVE_CHECKIN,
  CHECKIN_REMOVED,
  CHECKIN_ERROR,
  RESET_ALL_DATA
} from '../actions/members';

export default function createReducer(initialState = {}) {
  if(initialState.allMembers && initialState.filter) {
    initialState = {
      ...initialState,
      filteredMembers: filterMembers(initialState.allMembers, initialState.filter)
    };
  } else {
    initialState = {
      ...initialState,
      filteredMembers: initialState.allMembers
    };
  }

  return function update(state = initialState, action) {
    const { type } = action || {};

    switch(type) {
    case IMPORT_MEMBERS:
      return {
        ...state,
        allMembers: action.members,
        filteredMembers: filterMembers(action.members, state.filter, state.search),
      };
    case FILTER_MEMBERS:
      return {
        ...state,
        filter: action.filter,
        filteredMembers: filterMembers(state.allMembers, action.filter, state.search)
      };
    case DO_SEARCH:
      return {
        ...state,
        search: action.search,
        filteredMembers: filterMembers(state.allMembers, state.filter, action.search)
      };

    case CREATE_CHECKIN:
      return {
        ...state,
        error: null
      };

    case CHECKIN_CREATED:
      return {
        ...state,
        checkins: {
          ...state.checkins,
          [action.member.nationbuilder_id]: true
        }
      };

    case REMOVE_CHECKIN:
      return {
        ...state,
        error: null
      };

    case CHECKIN_REMOVED:
      return {
        ...state,
        checkins: _.omit(state.checkins, [action.member.nationbuilder_id])
      }

    case CHECKIN_ERROR:
      console.error(action.error);

      return {
        ...state,
        error: action.error
      };

    case RESET_ALL_DATA:
      return {
        ...state,
        allMembers: [],
        filteredMembers: [],
        filter: "All",
        search: null,
        checkins: {}
      };

    default:
      return state;
    }
  }
}

function filterMembers(members, filter, search) {
  let memberChain = _.chain(members);

  switch(filter) {
  case "A-M":
    memberChain = memberChain.filter((member) => _.lowerCase(member.last_name) < "n");
    break;
  case "N-Z":
    memberChain = memberChain.filter((member) => _.lowerCase(member.last_name) >= "n");
    break;
  }

  if(search && (_.size(search) >= 3)) {
    memberChain = memberChain.filter((member) => {
      return fuzzyMatch(member, search);
    });
  }

  return memberChain.value();
}

function fuzzyMatch(member, search) {
  const searchString = _.lowerCase(`${member.first_name} ${member.last_name} ${member.email}`);

  return searchString.indexOf(search) > -1;
}
