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
    const loader = toast.loading("Buscando registros...")
    Api.get('/products?page=' + pg).then((data) => {
        if (!data){
            toast.dismiss(loader)
            return
        }

        toast.dismiss(loader)
        ACTION_PRODUCT_LIST.payload.rows = data.data
        ACTION_PRODUCT_LIST.payload.total = data.total
        ACTION_PRODUCT_LIST.payload.pagination = []
        dispatch(ACTION_PRODUCT_LIST)
    })
}

let callProductViewGet = (id) => (dispatch) => {
    const loader = toast.loading("Buscando detalhes do registro...")
    Api.get('/products/' + id).then((data) => {
        if (!data){
            toast.dismiss(loader)
            return
        }

        toast.dismiss(loader)
        ACTION_PRODUCT_VIEW.payload.name = data.name
        ACTION_PRODUCT_VIEW.payload.price = data.price
        dispatch(ACTION_PRODUCT_VIEW)
    })
}

let callProductPost = (data, success = () => { }) => (dispatch) => {
    const loader = toast.loading("Cadastrando novo registro...")
    Api.post('/products', data).then((data) => {
        if (!data){
            toast.dismiss(loader)
            return
        }

        toast.update(loader, { render: data.msg, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000 })
        success()
    })
}

let callProductPut = (id, data, success = () => { }) => (dispatch) => {
    const loader = toast.loading("Alterando registro...")
    Api.put('/products/' + id, data).then((data) => {
        if (!data){
            toast.dismiss(loader)
            return
        }

        toast.update(loader, { render: data.msg, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000 })
        success()
    })
}

let callProductClearView = () => (dispatch) => {
    ACTION_PRODUCT_VIEW.payload.name = ''
    ACTION_PRODUCT_VIEW.payload.price = ''
    dispatch(ACTION_PRODUCT_VIEW)
}

let callProductDelete = (id, success = () => { }) => (dispatch) => {
    const loader = toast.loading("Excluindo registro...")
    Api.delete('/products/' + id).then((data) => {
        if (!data){
            toast.dismiss(loader)
            return
        }

        toast.update(loader, { render: data.msg, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000 })
        success()
    })
}

export { callProductListGet, callProductViewGet, callProductPost, callProductPut, callProductDelete, callProductClearView, ACTION_PRODUCT_LIST, ACTION_PRODUCT_VIEW }