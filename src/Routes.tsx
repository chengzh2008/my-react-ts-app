import * as React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage";
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";

const Routes: React.SFC = () => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Redirect exact={true} from="/" to="/products" />
                    <Route exact={true} path="/products" component={ProductsPage} />
                    <Route path="/products/:id" component={ProductPage} />
                    <Route path="/admin">
                        {loggedIn ? <AdminPage /> : <Redirect to="/login" />}</Route>
                    <Route path="/login" component={LoginPage} />
                    <Route component={NotFoundPage} />
                </Switch>  
            </div>
        </Router>
    )
}

export default Routes;