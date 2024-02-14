import { toast } from "react-toastify";
import Api from '../../../../axios'

let ACTION_PRODUCT_LIST = {
    type: 'PRODUCT_LIST',
    payload: {
        rows: [],
        total: 0,
        pagination: [],
    },
};

let ACTION_PRODUCT_VIEW = {
    type: 'PRODUCT_VIEW',
    payload: {
        name: '',
        price: '',
    },
};

let callProductListGet = (filter = {}, pg = 1) => (dispatch) => {
    Api.get('/products?page=' + pg).then((data) => {
        if (!data)
            return

        console.log(data.rows)
        ACTION_PRODUCT_LIST.payload.rows = data.data
        ACTION_PRODUCT_LIST.payload.total = data.total
        ACTION_PRODUCT_LIST.payload.pagination = []
        dispatch(ACTION_PRODUCT_LIST)
    })
}

let callProductViewGet = (id) => (dispatch) => {
    Api.get('/products/' + id).then((data) => {
        if (!data)
            return

        ACTION_PRODUCT_VIEW.payload.name = data.name
        ACTION_PRODUCT_VIEW.payload.price = data.price
        dispatch(ACTION_PRODUCT_VIEW)
    })
}

let callProductPost = (data, success = () => { }) => (dispatch) => {
    Api.post('/products', data).then((data) => {
        if (!data)
            return

        toast.success(data.msg)
        success()
    })
}

let callProductPut = (id, data, success = () => { }) => (dispatch) => {
    Api.put('/products/' + id, data).then((data) => {
        if (!data)
            return

        toast.success(data.msg)
        success()
    })
}

let callProductClearView = () => (dispatch) => {
    ACTION_PRODUCT_VIEW.payload.name = ''
    ACTION_PRODUCT_VIEW.payload.price = ''
    dispatch(ACTION_PRODUCT_VIEW)
}

let callProductDelete = (id, success = () => { }) => (dispatch) => {
    Api.delete('/products/' + id).then((data) => {
        if (!data)
            return

        toast.success(data.msg)
        success()
    })
}

export { callProductListGet, callProductViewGet, callProductPost, callProductPut, callProductDelete, callProductClearView, ACTION_PRODUCT_LIST, ACTION_PRODUCT_VIEW }