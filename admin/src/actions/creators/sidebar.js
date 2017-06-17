import * as actions from '../sidebar';

export function sidebarToggle(data) {
    return (dispatch) => {
        return dispatch({type: actions.SIDEBAR_TOGGLE, data});
    }
}