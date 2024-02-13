import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../common/containers/Loader'
import { useEffect, useState } from 'react';
import { callTokenPost } from '../common/actions/app';
import { callAuthGet } from './common/actions/app';
import routes from './routes';
import Menu from './common/containers/Menu';


let MiddlewareLogged = ({ loader, header, children }) => {
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
    loader: app.loader
});

const mapDispatchToProps = (dispatch) => ({
    configMethods: bindActionCreators(
        {
            callTokenPost,
            callAuthGet
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(MiddlewareLogged)