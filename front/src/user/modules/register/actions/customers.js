import { toast } from "react-toastify";
import Api from '../../../../axios'
import { callLoader } from '../../../../common/actions/app'

let ACTION_CUSTOMER_LIST = {
    type: 'CUSTOMER_LIST',
    payload: {
        rows: [],
        total: 0,
        pagination: [],
    },
};

let ACTION_CUSTOMER_VIEW = {
    type: 'CUSTOMER_VIEW',
    payload: {
        name: '',
    },
};

let callCustomerListGet = (filter = {}, pg = 1) => (dispatch) => {
    Api.get('/customers?page=' + pg).then((data) => {
        if (!data)
            return

        ACTION_CUSTOMER_LIST.payload.rows = data.data
        ACTION_CUSTOMER_LIST.payload.total = data.total
        ACTION_CUSTOMER_LIST.payload.pagination = []
        dispatch(ACTION_CUSTOMER_LIST)
    })
}

let callCustomerViewGet = (id) => (dispatch) => {
    Api.get('/customers/' + id).then((data) => {
        if (!data)
            return

        ACTION_CUSTOMER_VIEW.payload.name = data.name
        dispatch(ACTION_CUSTOMER_VIEW)
    })
}

let callCustomerPost = (data, success = () => { }) => (dispatch) => {
    Api.post('/customers', data).then((data) => {
        if (!data)
            return

        toast.success(data.msg)
        success()
    })
}

let callCustomerPut = (id, data, success = () => { }) => (dispatch) => {
    Api.put('/customers/' + id + '', data).then((data) => {
        if (!data)
            return

        toast.success(data.msg)
        success()
    })
}

let callCustomerClearView = () => (dispatch) => {
    ACTION_CUSTOMER_VIEW.payload.name = ''
    dispatch(ACTION_CUSTOMER_VIEW)
}

let callCustomerDelete = (id, success = () => { }) => (dispatch) => {
    Api.delete('/customers/' + id).then((data) => {
        if (!data)
            return

        toast.success(data.msg)
        success()
    })
}

export { callCustomerListGet, callCustomerViewGet, callCustomerPost, callCustomerPut, callCustomerDelete, callCustomerClearView, ACTION_CUSTOMER_LIST, ACTION_CUSTOMER_VIEW }