import React, { component } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FaTimes, FaSearch, FaUser, FaKey, FaShoppingBag } from 'react-icons/fa';
import Login from './Login';
import Signup from './Signup';
import { Link } from 'react-router-dom';



// function cartItem(props) {
//   return (

//     <ul className='d-flex cart-item pt-2 pb-2 pl-2 pr-3' >
//       <li> <img className='cart-img' src={`../assets/img/uploads/${props.item.img}`} alt="" /></li>
//       <li><a href="#" className='permalink'><h6>{props.item.name}</h6></a>
//         <p>1 × ₹{props.item.price}</p></li>
//       <li><a className='mt-n2 close-cart' type='button' onClick={this.hideCart}>&times;</a></li>
//     </ul>
//   )
// }


class Header extends React.Component {

  logoutStorage = () => {
    localStorage.removeItem("TOKEN");
    window.location.reload(false);

  };
  hideButton = () => {
    document.getElementById("top").style.display = "none";
  };
  hideCart = () => {
    document.getElementById("cart").style.display = "none";
    document.getElementById("cr").style.display = "block";
  };

  calTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.map((item) => {
      let itemPrice = item.count * parseInt(item.price);
      totalPrice += itemPrice;
    });
    return totalPrice;
  };

  constructor(props) {
    super(props);

    this.state = {
      // Get value from localStorage or use default
      cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
      totalPrice: localStorage.getItem("cart")
        ? this.calTotalPrice(JSON.parse(localStorage.getItem("cart")))
        : 0,
    };
    
  

    // console.log(this.state.plan)
    // Listen to storage event
    window.addEventListener("storage", (e) => this.storageChanged(e));

    // Bind this to storageChanged()
    // this.storageChanged = this.storageChanged.bind(this);
  }


  hideCartRemove = (event) => {
    console.log("sssss", event.target.dataset.id);
    const oldCart = JSON.parse(localStorage.getItem('cart'))
    if (oldCart) {
      const newCart = oldCart.filter((item) => item.id != event.target.dataset.id)
      localStorage.setItem('cart', JSON.stringify(newCart))
      window.location.reload(false);
    } else {
      alert("Please Insert the Item")
    }
  };

  // logoutStorage () {
  //   localStorage.removeItem("TOKEN");

  // }
  storageChanged(e) {
    console.log("Storage Change");
    if (e.key === "cart") {
      this.setState({
        cart: JSON.parse(e.newValue),
      });
    }
  }



  render() {

    const token = localStorage.getItem("TOKEN")
    if (!token) {
      var login = "Login";
    }
    else {
      var logout = "Logout";
    }
    // if (!this.state.cart) {
    //   var plan = this.state.plan.name;
    // }
  

    return (
      <>
        <style>
          {`
                    .nav-section
                    {
                      padding: 1em 2em;
                    }              
                    `}
        </style>
        <header className="container-fluid header-main">
          <div className="top-section row" id="top">
            <div className="top-text text-center col-md-12">
              <p>
                Free Shipping on orders above 250 INR{" "}
                <a
                  className="remove-btn pr-4 float-right mt-n1"
                  type="button"
                  onClick={this.hideButton}
                >
                  <FaTimes />
                </a>{" "}
              </p>
            </div>
          </div>
          <section className="row nav-section">
            <div className="col-md-12">
              <div className="container-nav">
                <Navbar expand="lg">
                  <Container className="mt-n3 mb-n2">
                    <Navbar.Brand href="/">
                      <img
                        src="../assets/img/uploads/2021/10/Asset-1%408x.png"
                        alt="logo"
                        className=" img-fluid"
                      />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto first-nav">
                        <Link
                          to="/"
                          className={
                            window.location.href.split("/")[3] == ""
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          Home
                        </Link>



                        <Link
                          to="/shop"
                          className={
                            window.location.href.split("/")[3] == "shop"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          Shop
                        </Link>
                        <Link
                          to="/subscription"
                          className={
                            window.location.href.split("/")[3] == "subscription"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          Subscription
                        </Link>
                        <NavDropdown
                          title="Shop By Category"
                          id="basic-nav-dropdown"
                        >
                          <NavDropdown.Item href="#">
                            Vegetables
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#">Fruits</NavDropdown.Item>
                          <NavDropdown.Item href="#">
                            Hydroponics
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#">
                            Microgreens
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#">
                            Soil Less
                          </NavDropdown.Item>
                        </NavDropdown>
                        <Link
                          to="/our-farms"
                          className={
                            window.location.href.split("/")[3] == "our-farms"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          Our Farms
                        </Link>
                        <Link
                          to="/about"
                          className={
                            window.location.href.split("/")[3] == "about"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          About
                        </Link>
                        <Link
                          to="/contact"
                          className={
                            window.location.href.split("/")[3] == "contact"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          Contact
                        </Link>
                        <Link
                          to="/my-account"
                          className={
                            window.location.href.split("/")[3] == "my-account"
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          Account
                        </Link>
                      </Nav>
                    </Navbar.Collapse>
                    <Nav className="header-social">
                      <Nav.Link
                        href="#"
                        class="btn btn-default btn-rounded mb-4"
                        data-toggle="modal"
                        data-target="#modalRegisterForm"
                      >

                        {login}
                      </Nav.Link>
                      <Nav.Link
                        class="btn btn-default btn-rounded mb-4" onClick={this.logoutStorage.bind()}
                      >
                        <p></p>
                        {logout}
                      </Nav.Link>
                      <Nav.Link
                        href="#"
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        <FaSearch />
                      </Nav.Link>
                      <Nav.Link href="#">
                        {" "}
                        <FaShoppingBag id="shopping-nav" />{" "}
                        <span id="abc"
                          style={{
                            color: "#fff",
                            background: "#459e0d",
                            borderRadius: "15px",
                            padding: "2px 7px",
                            position: "relative",
                            right: "8px",
                            bottom: "8px",
                            fontSize: "11px",
                          }}
                        >
                          {this.state.cart.length}
                        </span>{" "}
                      </Nav.Link>
                    </Nav>
                    {/* search form  start*/}
                    <div class="modal fade" id="myModal">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button
                              type="button"
                              className="close text-dark"
                              data-dismiss="modal"
                            >
                              &times;
                            </button>
                          </div>
                          <div class="modal-body">
                            <form className="row text-center">
                              <div className="col-md-12">
                                <input
                                  type="texat"
                                  id="search"
                                  name="search"
                                  placeholder="Search...."
                                ></input>
                              </div>
                              <div className="col-md-12 mt-2">
                                <select name="category" id="category">
                                  <option value="all">All Categories</option>
                                  <option value="vegetables">Vegetables</option>
                                  <option value="fruits">Fruits</option>
                                  <option value="soil less">Soil Less</option>
                                  <option value="microgreens">
                                    Microgreens
                                  </option>
                                  <option value="hydroponics">
                                    Hydroponics
                                  </option>
                                </select>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-s btn-success">
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* search form  end */}
                  </Container>
                </Navbar>
              </div>
            </div>
          </section>
          {/* shopping-cart */}
          <div className="row">
            <div className="col-lg-8 col-sm-6"></div>
            <div className="col-lg-4 col-sm-5 shopping-b pr-md-5">
              <div className="card cart-box mt-n3">
                <div className="card-body">
                  <div className="empty text-center pt-5 pb-5" id="cr">
                    <img
                      src="assets/img/uploads/2022/06/empty-cart.svg"
                      alt=""
                    />
                  </div>
                  <div id="cart" className="addtocart-slider">
                    {this.state.cart.map((cartItem, index) => {
                      return (
                        <ul className="d-flex cart-item pt-2 pb-2 pl-2 pr-3">
                          <li>
                            {" "}
                            <img
                              className="cart-img"
                              src={`../assets/img/uploads/${cartItem.img}`}
                              alt=""
                            />
                          </li>
                          <li>
                            <a href="#" className="permalink">
                              <h6>{cartItem.name}</h6>
                            </a>
                            <p>
                              {cartItem.count} × ₹{cartItem.price}
                            </p>
                          </li>
                          <li>
                            <input
                              className="btn-danger px-3 py-1 border-0"
                              type="button"
                              data-id={cartItem.id}
                              value="X"
                              onClick={this.hideCartRemove}
                            />
                          </li>
                        </ul>
                      );
                    })}
                    <hr />
                    <p className="text-center">
                      <b>Sub Total</b> ₹{this.state.totalPrice}
                    </p>
                    <hr />
                    <ul className="d-flex text-center mt-3">
                      <li>
                        {" "}

                        <Link to="/check" className="checkout hover-cart">CHECKOUT</Link>

                      </li>
                      <li>

                        <Link to="/view" className="viewcart hover-cart ml-lg-4">VIEW CART</Link>

                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className=""></div>
          </div>
          {/* shopping-cart end*/}
          {/* login and Signup form start */}
          <div
            class="modal fade"
            id="modalRegisterForm"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog md-lg" role="document">
              <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-12 bg-login"></div>
                <div className="col-lg-7 p-lg col-md-7 col-sm-12 lg-sup">
                  <div class="modal-content pb-5">
                    <div class="modal-header text-center login-form ml-3">
                      <ul className="nav nav-tabs mt-5">
                        <li class="nav-item">
                          {" "}
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#login"
                          >
                            Login
                          </a>
                        </li>
                        <li class="nav-item">
                          {" "}
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#signup"
                          >
                            Signup
                          </a>
                        </li>
                      </ul>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body mx-3 tab-content">
                      <form id="login" className="tab-pane active">
                        <Login />
                      </form>
                      <form id="signup" className="tab-pane fade">
                        <Signup />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* login and Signup form end */}
        </header>
      </>
    );
  }
}
export default Header