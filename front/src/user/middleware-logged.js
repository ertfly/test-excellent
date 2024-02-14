import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../common/containers/Loader'
import { useEffect } from 'react';
import { callAuthGet } from './common/actions/app';
import routes from './routes';
import Menu from './common/containers/Menu';


let MiddlewareLogged = ({ loader, logged, header, children, methods: { callAuthGet } }) => {

    useEffect(() => {
        callAuthGet();
    },[callAuthGet])

    if(!logged && loader){
        return <Loader show={true} />
    }

    if(!logged && !loader){
        return <Navigate to={'/account/login'} />
    }

    return (
        <>
            <Loader show={loader} />
            <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className='wrapper-office'>
                {header}
                <div className='menu'><Menu /></div>
                {routes.length > 0 ?
                    (
                        <Routes>
                            {routes.map((a, ai) => <Route path={a.path} key={ai} element={<a.container />} />)}
                        </Routes>
                    ) : <></>}
                <div className='content'>{children}</div>
            </div>
        </>
    )
}

const mapStateToProps = ({ app }) => ({
    logged: app.session.logged,
    loader: app.loader
});

const mapDispatchToProps = (dispatch) => ({
    methods: bindActionCreators(
        {
            callAuthGet
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(MiddlewareLogged)