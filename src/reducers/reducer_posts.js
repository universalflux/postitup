import { FETCH_POSTS } from '../actions';
import { FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
        case DELETE_POST:
        return _.omit(state, action.payload.data)
        case FETCH_POST:
        return { ...state, [action.payload.data.id]: action.payload.data };
        case FETCH_POSTS:
        return _.mapKeys(action.payload.data, 'id')
        default:
        return state;
    }
}