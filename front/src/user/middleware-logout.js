import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../common/containers/Loader'
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { callAuthGet } from './common/actions/app';

let MiddlewareLogout = ({ loader, logged, methods: {callAuthGet}, children }) => {

    useEffect(() => {
        callAuthGet();
    },[callAuthGet])

    if(logged){
        return <Navigate to={'/'} />
    }
    return (
        <>
            <Loader show={loader} />
            <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className='wrapper-office'>
                {children}
            </div>
        </>
    )
}

const mapStateToProps = ({ app }) => ({
    loader: app.loader,
    logged: app.session.logged 
});

const mapDispatchToProps = (dispatch) => ({
    methods: bindActionCreators(
        {
            callAuthGet
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(MiddlewareLogout)