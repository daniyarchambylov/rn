import * as sidebarActions from '../actions/sidebar';

const initialState = {
    isSidebarToggled: false
};

export default function authReducer(state, action) {
    if (state === undefined) {
        return initialState;
    }

    switch (action.type) {
        case sidebarActions.SIDEBAR_TOGGLE:
            console.log(action.data);
            return {
                ...state,
                isSidebarToggled: action.data,
            };
        default:
            return state;
    }

}