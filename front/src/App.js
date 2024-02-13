import { Routes, Route, useNavigate } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./user/store";
import Middleware from "./user/middleware";
import Login from './user/modules/account/containers/Login';
import HeaderLogged from './user/common/containers/HeaderLogged';
import Dashboard from './user/modules/dashboard/containers/Dashboard';
import NoMiddleware from './user/no-middleware';

function App() {
  window.navigate = useNavigate()
  return (
    <Routes>
      {/* Routes Loggout */}
      <Route path="/account/login" exact element={
        <Provider store={store}>
          <NoMiddleware>
            <Login />
          </NoMiddleware>
        </Provider>} />
        
      {/* Routes Logged */}
      <Route path="/*" index element={
        <Provider store={store}>
          <Middleware header={<HeaderLogged />}>
            <Dashboard />
          </Middleware>
        </Provider>} />
    </Routes>
  );
}

export default App