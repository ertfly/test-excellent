import Api from '../../../../axios'
import { callLoader } from '../../../../common/actions/app'

let callLoginPost = (data, callback = () => { }) => (dispatch) => {
    dispatch(callLoader(true))
    Api.post('/auth', data).then(data => {
        dispatch(callLoader(false))
        if (!data)
            return;

        callback(data)
    })
}

export { callLoginPost }