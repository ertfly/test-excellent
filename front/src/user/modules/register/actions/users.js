import { toast } from "react-toastify";
import Api from '../../../../axios'

let ACTION_USER_LIST = {
    type: 'USER_LIST',
    payload: {
        rows: [],
        total: 0,
        pagination: [],
    },
};

let ACTION_USER_VIEW = {
    type: 'USER_VIEW',
    payload: {
        name: '',
        email: '',
    },
};

let callUserListGet = (filter = {}, pg = 1) => (dispatch) => {
    Api.get('/users?page=' + pg).then((data) => {
        if (!data)
            return


        ACTION_USER_LIST.payload.rows = data.data
        ACTION_USER_LIST.payload.total = data.total
        ACTION_USER_LIST.payload.pagination = []
        dispatch(ACTION_USER_LIST)
    })
}

let callUserViewGet = (id) => (dispatch) => {
    Api.get('/users/' + id).then((data) => {
        if (!data)
            return

        ACTION_USER_VIEW.payload.name = data.name
        ACTION_USER_VIEW.payload.email = data.email
        dispatch(ACTION_USER_VIEW)
    })
}

let callUserPost = (data, success = () => { }) => (dispatch) => {
    Api.post('/users', data).then((data) => {
        if (!data)
            return

        toast.success(data.msg)
        success()
    })
}

let callUserPut = (id, data, success = () => { }) => (dispatch) => {
    Api.put('/users/' + id, data).then((data) => {
        if (!data)
            return

        toast.success(data.msg)
        success()
    })
}

let callUserClearView = () => (dispatch) => {
    ACTION_USER_VIEW.payload.name = ''
    ACTION_USER_VIEW.payload.email = ''
    dispatch(ACTION_USER_VIEW)
}

let callUserDelete = (id, success = () => { }) => (dispatch) => {
    Api.delete('/users/' + id).then((data) => {
        if (!data)
            return

        toast.success(data.msg)
        success()
    })
}

export { callUserListGet, callUserViewGet, callUserPost, callUserPut, callUserDelete, callUserClearView, ACTION_USER_LIST, ACTION_USER_VIEW }