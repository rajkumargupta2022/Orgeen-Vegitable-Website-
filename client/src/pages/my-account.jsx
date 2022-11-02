import React from "react";
import { FaTachometerAlt, FaCartArrowDown, FaDownload, FaWallet, FaMapMarkerAlt, FaUserAlt, FaGift, FaPlusCircle, FaRandom, FaListAlt, FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
class My_Account extends React.Component {
  
      
    constructor(props) {
        super(props);
        this.handleCheckOut = this.handleCheckOut.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
         this.state = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            checkPassword:"",
            msg:""
       
           
        };
        this.state = {
      
            records: [],
            recordss: []
           
        };
      
    }
    logoutStorage = () => {
        localStorage.removeItem("TOKEN");
        window.location.reload(false);
    
      };
    handleCheckOut(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    handleSubmit(e) {
        const { currentPassword, newPassword, confirmPassword } = this.state
        e.preventDefault()
    if((newPassword===confirmPassword)){
        const data = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
            email:window.localStorage.getItem('email')
        }
      
        axios.post("http://localhost:5000/updatePassword", data, {
        })
            .then(res => {
                toast("Password Updated Successfully!")
                this.setState({
                    currentPassword: "", 
                    newPassword: "", 
                    confirmPassword: ""
                })

            })
            .catch(error => {
               alert("Please Enter Correct Password ")
              });
        

    }else{
        alert("New Password and Confirm Password Did not Match")
    }
}
    componentDidMount() {
        const email = {
            "name": window.localStorage.getItem('email')
          }
//    const email= window.localStorage.getItem('email')
        fetch('http://localhost:5000/orderData')
            .then((response) => response.json())
            .then(records => {
                this.setState({
                     records: records.allOrder, 
                     recordss: records.address 
                    });
            });
           
    }

    render() {
        return (
            <>
                <style>
                    {`                
                a:hover
                {
                    text-decoration:none;
                }                
                `}
                </style>
                <div className="container-fluid bg-main">
                    <section className="my-account-s pt-5">
                        <div className="row pt-3">
                        <ToastContainer toastStyle={{ backgroundColor: "green" }} />
                            <div className="col-md-3">
                                <ul className="nav nav-tabs d-block">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#dashboard"><FaTachometerAlt />  DASHBOARD</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#orders"><FaCartArrowDown /> ORDERS</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#downloads"><FaDownload /> DOWNLOADS</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#wallets"><FaWallet /> MY WALLET</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#coupons"><FaGift /> COUPONS</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#addresses"><FaMapMarkerAlt /> ADDRESSES</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#account"><FaUserAlt /> ACCOUNT DETAILS</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab"  onClick={this.logoutStorage.bind()} href="#logout"><FaSignOutAlt />LOGOUT</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-9">
                                <div className="tab-content">
                                    <div id="dashboard" class="container tab-pane active"><br />
                                        <p>Hello <b>{this.state.recordss.first_name} {this.state.recordss.last_name} </b>(not <b>{this.state.recordss.first_name} {this.state.recordss.last_name}</b>? <a href="#">Log out</a>)</p>
                                        <p>From your account dashboard you can view your <a href="#">recent orders</a>, manage your <a href="#">shipping and billing addresses</a>, and<a href="#"> edit your password and account details</a>.</p>
                                    </div>
                                    <div id="orders" class="container tab-pane fade"><br />
                                        <table className="table table-bordered text-center table-responsive">
                                            <thead>
                                                <tr>
                                                    <th>Order</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Total</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                            this.state.records.map((user) => (
                                                <tr>
                                                    <td><a href="#">{user.order_number}</a></td>
                                                    <td>{user.createdAt}</td>
                                                    <td>{user.cod} </td>
                                                    <td>₹{user.total_price}.00 for 1 item </td>
                                                    <td><button>VIEW</button></td>

                                                </tr>
                                                  ))
                                                }
                                          
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="downloads" className="container tab-pane fade">

                                        <a href="/shop" className="mt-4">Browse Products</a>
                                        <p className="mt-5 text-center">No downloads available yet. </p>
                                    </div>

                                    <div id="wallets" className="container tab-pane fade">
                                        <div className="row">
                                            <div className="col-lg-3 col-sm-5">
                                                <h3 className="text-center">My Wallet</h3>
                                                <ul>
                                                    <li className="card"><a href="#"><FaPlusCircle /><p>Wallet-topup</p></a></li>
                                                    <li className="card"><a href="#"><FaRandom /><p>Wallet-transfer</p></a></li>
                                                    <li className="card"><a href="#"><FaListAlt /><p>Transactions</p></a></li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-9 col-sm-7 ">
                                                <h3 className="mt-5">Balance  <span className="float-right">₹0.00</span></h3>
                                                <hr />
                                                <div className="content">
                                                    <h6>No transactions found </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="coupons" className="container tab-pane fade">
                                        Sorry, No coupons available for you.
                                    </div>
                                    <div id="addresses" className="container tab-pane fade">
                                        <h6>The following addresses will be used on the checkout page by default.</h6>
                                        <hr />
                                        <header>
                                            <h2>Billing address</h2> <a className="edit mt-n5">EDIT</a></header>
                                           
                                        <address className="pt-4">
                                            {this.state.recordss.first_name} {this.state.recordss.last_name}<br />
                                            {this.state.recordss.street_address} <br />
                                            {this.state.recordss.town_city} {this.state.recordss.state}<br />
                                            {this.state.recordss.pin}
                                        </address>
                                      
                                        <hr />
                                        <header>
                                            <h2>Shipping address </h2> <a className="edit mt-n5">EDIT</a></header>
                                            <address className="pt-4">
                                            {this.state.recordss.first_name} {this.state.recordss.last_name}<br />
                                            {this.state.recordss.street_address} <br />
                                            {this.state.recordss.town_city} {this.state.recordss.state}<br />
                                            {this.state.recordss.pin}
                                        </address>
                                    </div>
                                    <div id="account" className="container tab-pane fade" >
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                            <div className="card ac-d">                                
                                        <form className="needs-validation" novalidate="">

                                            <div className="card-body">
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="first">First name
                                                        <abbr className="required" title="required">*</abbr>
                                                    </label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" required="" name="first" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="last">Last name
                                                        <abbr className="required" title="required">*</abbr></label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" required="" name="last" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="displayName">Display Name</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" name="displayName" />
                                                    </div>
                                                </div>                                        
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="email">Email address
                                                        <abbr className="required" title="required">*</abbr></label>
                                                    <div className="col-sm-7">
                                                        <input type="email" name="email" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right pb-3 pr-3">
                                                <button className="btn btn-success">Save</button>
                                            </div>
                                        </form>                               

                                    
                                        </div>

                                </div>
                                <div className="col-md-6 mb-4">
                                            <div className="card ac-d">
                                    <div className="card-header bg-success">
                                        
                                            <h4 className="text-center text-uppercase  text-white">Password change</h4>
                                            </div>
                                           
                                   
                                    
                                        <form className="needs-validation" onSubmit={this.handleSubmit}>

                                            <div className="card-body">
                                                <div className="form-group row">
                                                    {/* <span style={{color: "red"}}>{checkPassword}</span> */}
                                                    <label className="col-sm-5 col-form-label" for="currentpass">Current password
                                                        <abbr className="required" title="required">*</abbr>
                                                    </label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" required=""name="currentPassword"  value={this.state.currentPassword} onChange={this.handleCheckOut} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="newpass">New password
                                                        <abbr className="required" title="required">*</abbr></label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" required="" name="newPassword" value={this.state.newPassword} onChange={this.handleCheckOut} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="confirmpass">Confirm password</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" name="confirmPassword"  value={this.state.confirmPassword} onChange={this.handleCheckOut} />
                                                    </div>
                                                </div>                                        
                                              
                                            </div>
                                            <div className="text-right pb-3 pr-3">
                                                <button type="submit" className="btn btn-success pb-2">Save Change</button>
                                            </div>
                                        </form>                               

                                    
                                   

                                </div>
                                                {/* <div className="card">
                                            <form>
                                            <label for="firstName">First Name <span className="text-danger">*</span></label>
                                            <input type="text" name="firstName" className="ml-md-5" /><br />
                                            <label for="lastName">Last Name <span className="text-danger">*</span></label>
                                            <input type="text" name="lastName" className="ml-md-5" /><br />
                                            <label for="displayName">Display Name <span className="text-danger">*</span></label>
                                            <input type="text" name="displayName" className="ml-md-3" /><p>This will be how your name will be displayed in the account </p>
                                            <label for="email">Email Addresses <span className="text-danger">*</span></label>
                                            <input type="email" name="email" /><br />
                                            <h2 className="pb-4 pt-4"><i>Password change</i></h2><br />
                                            <label for="currentpass">Current password (leave blank to leave unchanged)</label><br />
                                            <input type="password" name="currentpass" /><br />
                                            <label for="newpass">New password (leave blank to leave unchanged)</label><br />
                                            <input type="password" name="newpass" /><br />
                                            <label for="confirmpass">Confirm new password</label><br />
                                            <input type="password" name="confirmpass" /><br />
                                            <button>Save changes</button>
                                        </form>
                                        </div> */}
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        )
    }
}
export default My_Account