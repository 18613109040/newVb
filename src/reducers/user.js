import {GET_USER_INFO, UPDATA_USER_INFO, USER_LOGIN} from '../actions/user'
import {storage} from '../utils/tools';

const initialState = {};

export function userInfo(state = {}, action) {
    let json = action.json;
    switch (action.type) {
        case USER_LOGIN:
            storage.setObj({
                userInfo: json.data
            })
            return Object.assign({}, state, json.data);
        case GET_USER_INFO:
            storage.setObj({
                userInfo: json.data
            })
            return Object.assign({}, json.data);
        case UPDATA_USER_INFO:
            return Object.assign({}, json);
        default:
            return state
    }
}

