import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from './../common/containers/Loader'


let NoMiddleware = ({ loader, children }) => {
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
    loader: app.loader
});

const mapDispatchToProps = (dispatch) => ({
    configMethods: bindActionCreators(
        {
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(NoMiddleware)