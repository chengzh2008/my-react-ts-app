import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { Store } from "redux";

import { configureStore, IApplicationState } from "./Store";

interface IProps {
  store: Store<IApplicationState>;
}

const store = configureStore();
const Root: React.SFC<IProps> = props => {
  return (
    <Provider store={props.store}>
      <Routes />
    </Provider>
  );
};

ReactDOM.render(<Root store={store} />, document.getElementById("root") as HTMLElement);
