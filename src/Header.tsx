import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IApplicationState } from "./Store";

import logo from "./logo.svg";
import BasketSummary from "./BasketSummary";

interface IProps extends RouteComponentProps {
  basketCount: number;
}

const Header: React.SFC<IProps> = props => {
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    const searchParams = new URLSearchParams(props.location.search);
    setSearch(searchParams.get("search") || "");
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    // TODO: one char fewer than the current value
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.history.push(`/products?search=${search}`);
    }
  };

  return (
    <header className="header">
      <div className="search-container">
        <input
          type="search"
          placeholder="search"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
        <BasketSummary count={props.basketCount} />
      </div>
      <img src={logo} className="header-logo" alt="logo" />
      <h1 className="header-title">React Shop</h1>
      <nav>
        <NavLink
          to="/products"
          activeClassName="header-link-active"
          className="header-link"
        >
          Products
        </NavLink>
        <NavLink
          to="/contactus"
          activeClassName="header-link-active"
          className="header-link"
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/admin"
          activeClassName="header-link-active"
          className="header-link"
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
};

const mapStateToProps = (store: IApplicationState) => {
  return {
    basketCount: store.basket.products.length
  }
}

export default connect(mapStateToProps)(withRouter(Header));
