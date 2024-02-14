import { ACTION_APP_SESSION } from "../../user/common/actions/app"
import { ACTION_APP_LOADER } from "../actions/app"

let initialReducer = {
    loader: true,
    session: {
        logged: false,
        name: '',
    },
}

let AppReducer = (state = initialReducer, action) => {
    switch (action.type) {
        case ACTION_APP_LOADER.type:
            return {
                ...state,
                loader: action.payload
            }
        case ACTION_APP_SESSION.type:
            return {
                ...state,
                session: {
                    logged: action.payload.logged,
                    name: action.payload.name,
                }
            }
        default:
            return state
    }
}

export default AppReducer