import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Tables from "../../pages/tables";
import Blogs from "../../pages/blogs/Blogs";
import Products from "../../pages/products/Products";
import Categorys from "../../pages/categorys/Category";
import AddUser from "../../pages/tables/adduser";
import AddCategory from "../../pages/categorys/addcategory";
import AddBlog from "../../pages/blogs/addblog";
import UpdateBlog from "../../pages/blogs/updateblog";
import UpdateUser from "../../pages/tables/updateuser";
import UpdateCat from "../../pages/categorys/updatecategory";
import AddProduct from "../../pages/products/addproduct";
import UpdateProduct from "../../pages/products/updateproduct";
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/users" component={Tables} />
            <Route path="/app/categorys" component={Categorys} />
            <Route path="/app/adduser" component={AddUser} />
            <Route path="/app/addcategory" component={AddCategory} />
            <Route path="/app/updateuser/:id" component={UpdateUser} />
            <Route path="/app/blogs" component={Blogs} />
            <Route path="/app/addblog" component={AddBlog} />
            <Route path="/app/updateblog/:id" component={UpdateBlog} />
            <Route path="/app/products" component={Products} />
            <Route path="/app/addproduct" component={AddProduct} />
            <Route path="/app/updateproduct/:id" component={UpdateProduct} />
            <Route path="/app/updatecategory/:id" component={UpdateCat} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
