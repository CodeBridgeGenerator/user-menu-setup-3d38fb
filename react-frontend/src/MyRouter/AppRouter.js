import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleUserContextPage from "../components/app_components/UserContextPage/SingleUserContextPage";
import UserContextProjectLayoutPage from "../components/app_components/UserContextPage/UserContextProjectLayoutPage";
import SingleMenuItemsPage from "../components/app_components/MenuItemsPage/SingleMenuItemsPage";
import MenuItemProjectLayoutPage from "../components/app_components/MenuItemsPage/MenuItemProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
<Route path="/userContext/:singleUserContextId" exact element={<SingleUserContextPage />} />
<Route path="/userContext" exact element={<UserContextProjectLayoutPage />} />
<Route path="/menuItems/:singleMenuItemsId" exact element={<SingleMenuItemsPage />} />
<Route path="/menuItems" exact element={<MenuItemProjectLayoutPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
        </Routes>
    );
}

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
