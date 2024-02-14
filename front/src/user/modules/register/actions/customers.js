import { toast } from "react-toastify";
import Api from '../../../../axios'

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
    const loader = toast.loading("Buscando registros...")
    Api.get('/customers?page=' + pg).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.dismiss(loader)
        ACTION_CUSTOMER_LIST.payload.rows = data.data
        ACTION_CUSTOMER_LIST.payload.total = data.total
        ACTION_CUSTOMER_LIST.payload.pagination = []
        dispatch(ACTION_CUSTOMER_LIST)
    })
}

let callCustomerViewGet = (id) => (dispatch) => {
    const loader = toast.loading("Buscando detalhes do registro...")
    Api.get('/customers/' + id).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.dismiss(loader)
        ACTION_CUSTOMER_VIEW.payload.name = data.name
        dispatch(ACTION_CUSTOMER_VIEW)
    })
}

let callCustomerPost = (data, success = () => { }) => (dispatch) => {
    const loader = toast.loading("Cadastrando novo registro...")
    Api.post('/customers', data).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.update(loader, { render: data.msg, type: toast.TYPE.SUCCESS, isLoading: false })
        success()
    })
}

let callCustomerPut = (id, data, success = () => { }) => (dispatch) => {
    const loader = toast.loading("Alterando registro...")
    Api.put('/customers/' + id + '', data).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.update(loader, { render: data.msg, type: toast.TYPE.SUCCESS, isLoading: false })
        success()
    })
}

let callCustomerClearView = () => (dispatch) => {
    ACTION_CUSTOMER_VIEW.payload.name = ''
    dispatch(ACTION_CUSTOMER_VIEW)
}

let callCustomerDelete = (id, success = () => { }) => (dispatch) => {
    const loader = toast.loading("Excluindo registro...")
    Api.delete('/customers/' + id).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.update(loader, { render: data.msg, type: toast.TYPE.SUCCESS, isLoading: false })
        success()
    })
}

export { callCustomerListGet, callCustomerViewGet, callCustomerPost, callCustomerPut, callCustomerDelete, callCustomerClearView, ACTION_CUSTOMER_LIST, ACTION_CUSTOMER_VIEW }