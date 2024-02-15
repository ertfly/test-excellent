import { toast } from "react-toastify";
import Api from '../../../../axios'

let ACTION_PRODUCT_STOCK_LIST = {
    type: 'PRODUCT_STOCK_LIST',
    payload: {
        rows: [],
        total: 0,
        pagination: [],
    },
};

let callProductStockListGet = (productId, filter = {}, pg = 1) => (dispatch) => {
    const loader = toast.loading("Buscando registros...")
    Api.get('/product-stocks/' + productId + '?page=' + pg).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.dismiss(loader)
        ACTION_PRODUCT_STOCK_LIST.payload.rows = data.data
        ACTION_PRODUCT_STOCK_LIST.payload.total = data.total
        ACTION_PRODUCT_STOCK_LIST.payload.pagination = []
        dispatch(ACTION_PRODUCT_STOCK_LIST)
    })
}

let callProductStockPost = (data, success = () => { }) => (dispatch) => {
    const loader = toast.loading("Cadastrando novo registro...")
    Api.post('/product-stocks', data).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.update(loader, { render: data.msg, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000 })
        success(data.id)
    })
}

let callProductStockDelete = (id, success = () => { }) => (dispatch) => {
    const loader = toast.loading("Excluindo registro...")
    Api.delete('/product-stocks/' + id).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.update(loader, { render: data.msg, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000 })
        success()
    })
}

export { callProductStockListGet, callProductStockPost, callProductStockDelete, ACTION_PRODUCT_STOCK_LIST }