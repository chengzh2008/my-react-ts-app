import * as React from "react";
import {BrowserRouter as Router, RouteComponentProps, Redirect, Route, Switch} from "react-router-dom";
import {CSSTransition, TransitionGroup, Transition} from "react-transition-group";

import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage";
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";

const RoutesWrap: React.SFC = () => {
    return (
        <Router>
            <Route component={Routes} />
        </Router>
    )
}

const Routes: React.SFC<RouteComponentProps> = props => {
    const [loggedIn, setLoggedIn] = React.useState(true);
    return (
            <div>
                <Header />
                <TransitionGroup> 
                    <CSSTransition
                        key={props.location.key}
                        timeout={500}
                        classNames="animate">
                        <Switch>
                            <Redirect exact={true} from="/" to="/products" />
                            <Route exact={true} path="/products" component={ProductsPage} />
                            <Route path="/products/:id" component={ProductPage} />
                            <Route path="/admin">
                                {loggedIn ? <AdminPage /> : <Redirect to="/login" />}</Route>
                            <Route path="/login" component={LoginPage} />
                            <Route component={NotFoundPage} />
                        </Switch> 
                    </CSSTransition>
                    
                </TransitionGroup>
                 
            </div>
    )
}



export default RoutesWrap;