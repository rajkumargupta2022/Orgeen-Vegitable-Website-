import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./pages/Header";
import Footer from "./pages/footer";
import Home from "./pages/home";
import Shop from "./pages/shop";
import ProductDetail from "./pages/ProductDetail";
import Shop_Sidebar from "./pages/shop-sidebar";
import Product from "./pages/Product";
// import CProduct from "./pages/CProduct";
import Terms_And_Conditions from "./pages/terms-and-conditions";
import Privacy_Policy from "./pages/privacy-policy";
import Refund_Cancellation from "./pages/refund-cancellation";
import My_Account from "./pages/my-account";
import Subscription from "./pages/subscription";
import Our_Farms from "./pages/our-farms";
import About from "./pages/about";
import Contact from "./pages/contact";
import MonthlySubscription from "./pages/MonthlySubscription";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Login from "./components/Login";
import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
/* Dashboard */
import DashHeader from "./dashboard/header";
import DashFooter from "./dashboard/footer";
import Dashboard from "./dashboard/home"; 
import Products from "./dashboard/products";
import Categories from "./dashboard/categories";

import Orders from "./dashboard/orders";
import Category_Form from "./dashboard/category-form";
import Product_Form from "./dashboard/product-form";
import Add_Subscription_Plan from "./dashboard/add-subscription-plan";
import All_Subscription_Plan from "./dashboard/all-subscription-plan";
import Check_Out from "./pages/check-out";
import View_Cart from "./pages/view-cart";


const App = () => {

  return (

    <>

      {/* <Header/> */}
      <BrowserRouter>
        <Switch>

          {/* <Route exact path="/" ><Header /><Home /> <Footer /></Route> */}

          {/* <Route path="/" element={<Home />} />      
          <Route path="/login" element={<Login />} />       */}
          <Route exact path="/" ><Header /><Home /> <Footer /></Route>
          <Route exact path="/Product/:id"><Header />  <Product/> <Footer /> </Route>
          <Route exact path="/SingleProduct/:id"><Header />  <SingleProduct/> <Footer /> </Route>
          {/* <Route exact path="/cProduct"><Header />  <CProduct/> <Footer /> </Route> */}
          {/* <Route exact path="/single-product/:64"  ><Header />  <Single_Product/> <Footer /> </Route> */}
          <Route exact path="/shop" ><Header /><Shop /> <Footer /></Route>
          <Route exact path="/monthly-subscription-plan" ><Header /><MonthlySubscription /> <Footer /></Route>
          <Route exact path="/subscription" ><Header /><Subscription /> <Footer /></Route>
          <Route exact path="/our-Farms" ><Header /><Our_Farms /> <Footer /></Route>
          <Route exact path="/about" ><Header /><About /> <Footer /></Route>
          <Route exact path="/contact" ><Header /><Contact /> <Footer /></Route>
          <Route exact path="/my-account" ><Header /><My_Account /> <Footer /></Route>
          <Route exact path="/ProductDetail" ><Header /><ProductDetail /> <Footer /></Route>
          <Route exact path = "/check" > <Header / > <Check_Out / > <Footer / > </Route>
          <Route exact path = "/view" > <Header / > <View_Cart / > <Footer / > </Route>
          <Route exact path="/login"> <Header / > <Footer / ></Route>
          <Route path="/register"><Register /></Route>

          {/* Dashboard Start */}
          {/* <Route  path="/dashboard"> <Navbar/> <Dashboard /> </Route> */}
          {/* <DashHeader /> */}
          <Route  path="/dashboard" > <DashHeader/>  <Dashboard /> <DashFooter /></Route>
          <Route  path="/products"> <DashHeader/> <Products /> <DashFooter /> </Route>
          <Route  path="/categories"> <DashHeader/> <Categories/> <DashFooter /> </Route>
          
          <Route  path="/add-subscription-plan"> <DashHeader/> <Add_Subscription_Plan/> <DashFooter /> </Route>
          <Route  path="/all-subscription-plan"> <DashHeader/> <All_Subscription_Plan/> <DashFooter /> </Route>
          <Route  path="/orders"> <DashHeader/> <Orders/> <DashFooter /> </Route>
          <Route  path="/category-form"> <DashHeader/> <Category_Form/> <DashFooter /> </Route>
          <Route  path="/product-form"> <DashHeader/> <Product_Form/> <DashFooter /> </Route>
         
          {/* <DashFooter /> */}

          {/* Dashboard Stop */}
           
           
         
          <Route path="" element={<Check_Out />} />   
          <Route path="/shop" element={<Shop />} />   
          <Route path="/monthly-subscription-plan" element={<MonthlySubscription />} />   
          <Route path="/Product" element={<Product />} /> 
          <Route path="/SingleProduct" element={<SingleProduct />} /> 
          <Route path="/terms-and-conditions" element={<Terms_And_Conditions />} />   
          <Route path="/privacy-policy" element={<Privacy_Policy />} />  
          <Route path="/refund-cancellation" element={<Refund_Cancellation />} />  
          <Route path="/my-account" element={<My_Account />} />  
          <Route path="/subscription" element={<Subscription />} />  
          <Route path="/our-farms" element={<Our_Farms />} />  
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} />  
        </Switch>
      </BrowserRouter>
      {/* <Footer/>  */}

    </>
  );

};
export default App;
