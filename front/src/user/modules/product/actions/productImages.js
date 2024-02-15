import { toast } from "react-toastify";
import Api from '../../../../axios'

let ACTION_PRODUCT_IMAGE_LIST = {
    type: 'PRODUCT_IMAGE_LIST',
    payload: {
        rows: [],
        total: 0,
        pagination: [],
    },
};

let callProductImageListGet = (productId, filter = {}, pg = 1) => (dispatch) => {
    const loader = toast.loading("Buscando registros...")
    Api.get('/product-images/' + productId + '?page=' + pg).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.dismiss(loader)
        ACTION_PRODUCT_IMAGE_LIST.payload.rows = data.data
        ACTION_PRODUCT_IMAGE_LIST.payload.total = data.total
        ACTION_PRODUCT_IMAGE_LIST.payload.pagination = []
        dispatch(ACTION_PRODUCT_IMAGE_LIST)
    })
}

let callProductImagePost = (data, success = () => { }) => (dispatch) => {
    const loader = toast.loading("Cadastrando novo registro...")
    Api.post('/product-images', data).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.update(loader, { render: data.msg, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000 })
        success(data.id)
    })
}

let callProductImagePrincipal = (id, success = () => { }) => (dispatch) => {
    const loader = toast.loading("Excluindo registro...")
    Api.get('/product-images/active/' + id).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.update(loader, { render: data.msg, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000 })
        success()
    })
}

let callProductImageDelete = (id, success = () => { }) => (dispatch) => {
    const loader = toast.loading("Excluindo registro...")
    Api.delete('/product-images/' + id).then((data) => {
        if (!data) {
            toast.dismiss(loader)
            return
        }

        toast.update(loader, { render: data.msg, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000 })
        success()
    })
}

export { callProductImageListGet, callProductImagePost, callProductImageDelete, callProductImagePrincipal, ACTION_PRODUCT_IMAGE_LIST }