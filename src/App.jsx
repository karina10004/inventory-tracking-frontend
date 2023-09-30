// import Product from "./pages/Product";
// import Home from "./pages/shit/Home";
// import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import Cart from "./pages/Cart";
import Inventory from "./components/manager/inventoryofproducts";
import Dashboard from "./components/manager/Dashboard";
import Updateproduct from "./components/manager/UpdateProduct";
import CustomerDashboard from "./components/user";
import Profile from "./components/Profile";
// import Productmanager from "./components/productmanager";
import Orders from "./components/customer/vieworders";
import Productmanager from "./components/customer/manager-products";
import Manager from "./components/customer/managers";
// import Dashboard from "./components/manager-menu";
import Order from "./components/customer/order";
// import Manager from "./pages/Manager";
// import OrderListManager from "./components/manager/OrderListManager";
import RegisterDeliveryMan from "./components/manager/RegisterDeliveryMan";
import Delivery from "./components/manager/Delivery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Addproducts from "./components/manager/Addproducts";
import Notification from "./components/Notification";

const App = () => {
  const user = false;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login></Login>
          {/* <Dashboard></Dashboard> */}
        </Route>
        {/* <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route> */}
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/inventory">
          <Inventory></Inventory>
        </Route>
        <Route path="/addproducts">
          <Addproducts></Addproducts>
        </Route>
        <Route path="/manager/dashboard">
          <Dashboard></Dashboard>
        </Route>
        <Route path="/update/product/:product_id">
          <Updateproduct></Updateproduct>
        </Route>
        <Route path="/test">
          <RegisterDeliveryMan></RegisterDeliveryMan>
          <Delivery></Delivery>
        </Route>
        <Route path="/user/home">
          <CustomerDashboard></CustomerDashboard>
        </Route>
        <Route path="/userprofile">
          <Profile></Profile>
        </Route>
        <Route path="/placeorder">
          <Manager></Manager>
        </Route>
        <Route path="/orders">
          <Orders></Orders>
        </Route>
        <Route path="/order/:order_id">
          <Order></Order>
        </Route>
        <Route path="/products/:user_name">
          <Productmanager></Productmanager>
        </Route>
        <Route path="/notification">
          <Notification></Notification>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
