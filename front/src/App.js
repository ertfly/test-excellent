import { Routes, Route, useNavigate } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./user/store";
import MiddlewareLogged from "./user/middleware-logged";
import Login from './user/modules/account/containers/Login';
import HeaderLogged from './user/common/containers/HeaderLogged';
import Dashboard from './user/modules/dashboard/containers/Dashboard';
import MiddlewareLogout from './user/middleware-logout';

function App() {
  window.navigate = useNavigate()
  return (
    <Routes>
      {/* Routes Loggout */}
      <Route path="/account/login" exact element={
        <Provider store={store}>
          <MiddlewareLogout>
            <Login />
          </MiddlewareLogout>
        </Provider>} />
        
      {/* Routes Logged */}
      <Route path="/*" index element={
        <Provider store={store}>
          <MiddlewareLogged header={<HeaderLogged />}>
            <Dashboard />
          </MiddlewareLogged>
        </Provider>} />
    </Routes>
  );
}

export default App