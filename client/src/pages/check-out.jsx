import React from "react";
import Select from 'react-select';
import { FaPlusCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { element } from "prop-types";

const options = [
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Punjab', label: 'Punjab' }
]
const Locoptions = [
    { value: 'Home', label: 'Home' },
    { value: 'Office', label: 'Office' }
]
class Check_Out extends React.Component {
    
    calTotalPrice = (cart) => {
        let totalPrice = 0
        cart.map((item) => {
            let itemPrice = item.count * parseInt(item.price)
            totalPrice += itemPrice
        })
        return totalPrice
    }
    
    constructor(props) {

        super(props);
        this.state = { img: "" };
        this.handleCheckOut = this.handleCheckOut.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePlaceHolder = this.handlePlaceHolder.bind(this);

        this.state = {
            first_name: "",
            last_name: "",
            company_name: "",
            country_name: "",
            street_address: "",
            town_city: "",
            state: "",
            location: "",
            pin: "",
            phone: "",
            email: ""
        };

        this.state = {
            records: ''
        }
        this.state = {
            isChecked: true,
        }


        this.state = {
            // Get value from localStorage or use default
            cart: localStorage.getItem('cart') ?
                JSON.parse(localStorage.getItem('cart')) : [],
            totalPrice: localStorage.getItem('cart') ?
                this.calTotalPrice(JSON.parse(localStorage.getItem('cart'))) : 0


        }
        window.addEventListener('storage', (e) => this.storageChanged(e));
    }


    handleCheckOut(event) {
        this.setState({
            // Computed property names
            // keys of the objects are computed dynamically
            [event.target.name]: event.target.value
        })
    }
    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
        console.log("qqq", !this.state.isChecked)
    }

    storageChanged(e) {
        console.log('Storage Change');
        if (e.key === 'cart') {
            this.setState({
                cart: JSON.parse(e.newValue)
            })
        }
    }

    handleLocationCategory = (e) => {
        this.setState({ location: e.value });
    }

    handleStateCategory = (e) => {
        this.setState({ state: e.value });
    }
    handleSubmit(e) {
        const { first_name, last_name, company_name, country_name, street_address, town_city, state, location, pin, phone, email } = this.state

        e.preventDefault()
        console.log("localStorage.getItem('email')", localStorage.getItem('email'));
        const data = {
            first_name: first_name,
            last_name: last_name,
            company_name: company_name,
            country_name: country_name,
            street_address: street_address,
            town_city: town_city,
            state: state,
            location: location,
            pin: pin,
            phone: phone,
            email: email,
        }

        axios.post("http://localhost:5000/check-out", data, {
        })

            .then(res => {
                toast("Address Added Successfully!")
                this.setState({
                    first_name: "", last_name: "",
                    company_name: "",
                    country_name: "",
                    street_address: "",
                    town_city: "",
                    state: "",
                    location: "",
                    pin: "",
                    phone: "",
                    email: ""
                })

            })


    }


    handlePlaceHolder() {
        const emails=window.localStorage.getItem('TOKEN');
        // alert(emails)
    if(emails==null){
        toast.dismiss();
        toast("Plese Login First!")

    }else{

        const data = {
        
            email: window.localStorage.getItem('email'),
            user_id: this.state.totalPrice * 10,
            total_price: this.state.totalPrice,
            // discount_percentage: this.state.discount_percentage,
            cod: !this.state.isChecked

        }

        axios.post("http://localhost:5000/placeOrder", data, {
        })

            .then(res => {
                toast("Placed Order Successfully!")


            })

        }

    }


    componentDidMount() {
        this.setState({
            records: ''
        })
        console.log("localStorage.getItem('email')",localStorage.getItem('email'));
        fetch(`http://localhost:5000/getsingleCheckOut?email=${localStorage.getItem('email')}`, {logEmail:localStorage.getItem('email')})
            .then(res => res.json())
            .then(records => {
                console.log("daaaaaas", records.SingleCheckOutData);

                this.setState({
                    records: records.SingleCheckOutData
                })



            })

            .catch(error => console.log(error))
    }

    
    render() {
       
        var r = (Math.random() + 1).toString(36).substring(7)

        return (
            <>
                <div className="container-fluid check-out-main bg-main">
                    <ToastContainer toastStyle={{ backgroundColor: "lightgrey" }} />

                    <section className='check-out-section pb-5'>
                        <div className="card-body">
                            <p> Have a coupon?
                                <a className="" data-toggle="collapse" href="#collapseExample" role="button"
                                    aria-expanded="false" aria-controls="collapseExample">
                                    Click here to enter your code
                                </a>
                            </p>
                            <div className="collapse" id="collapseExample">
                                <p>
                                    If you have a coupon code, please apply it below.
                                </p>

                                <form>
                                    <div className="coupon row">
                                        <div className="col-md-4">
                                            <input type="text" placeholder="Coupon Code" className="form-control border-0 mt-2" />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="button" value="APPLY COUPON" className="ac mt-sm-2" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header ">
                                        <div className="row">
                                            <div className="col-sm-6"><h4 className="text-center text-uppercase text-success font-weight-bold">Billing details</h4></div>
                                            <div className="col-sm-6"><a className="float-right plus-i" data-toggle="collapse" href="#collapseExampleForm" role="button"
                                                aria-expanded="false" aria-controls="collapseExampleForm">
                                                <FaPlusCircle className="text-success" />
                                            </a>  </div>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapseExampleForm">
                                        <form className="needs-validation" onSubmit={this.handleSubmit}>

                                            <div className="card-body">
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="first">First Name
                                                    </label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" name="first_name" value={this.state.first_name} onChange={this.handleCheckOut} required />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="last">Last Name</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" required name="last_name" value={this.state.last_name} onChange={this.handleCheckOut} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="company">Company name (optional)</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" name="company_name" value={this.state.company_name} onChange={this.handleCheckOut} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="country">Country / Region</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" required name="country_name" value={this.state.country_name} onChange={this.handleCheckOut} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="street">Street Address</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" required name="street_address" value={this.state.street_address} onChange={this.handleCheckOut} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="city">Town / City</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control" required name="town_city" value={this.state.town_city} onChange={this.handleCheckOut} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="pin">PIN Code</label>
                                                    <div className="col-sm-7">
                                                        <input type="number" className="form-control" required name="pin" value={this.state.pin} onChange={this.handleCheckOut} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="state">State</label>
                                                    <div className="col-sm-7">
                                                        <Select options={options} name="state" onChange={this.handleStateCategory} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="location">Location Name</label>
                                                    <div className="col-sm-7">
                                                        <Select name="location" options={Locoptions} onChange={this.handleLocationCategory} />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="phone">Phone Number</label>
                                                    <div className="col-sm-7">
                                                        <input type="number" className="form-control" required name="phone" value={this.state.phone} onChange={this.handleCheckOut} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-5 col-form-label" for="email">Email address   {r}</label>
                                                    <div className="col-sm-7">
                                                        <input type="email" name="email" required className="form-control" value={this.state.email} onChange={this.handleCheckOut} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer text-right">
                                                <button type="submit" className="btn btn-success">Save</button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="px-2 py-3">
                                        <form >
                                            {/* <input type="radio" id="office" name="Address" value="HTML" /> */}


                                            <label for="office" className="pl-2">Location: {this.state.records ? this.state.records.location : null}</label><br />

                                            <label for="office" className="pl-2">Name: {this.state.records ? this.state.records.first_name : null} {this.state.records ? this.state.records.last_name : null}</label><br />

                                            <label for="office" className="pl-2">Mobile No: {this.state.records ? this.state.records.phone : null}</label><br />

                                            <label for="office" className="pl-2">Address: {this.state.records ? this.state.records.street_address : null}, {this.state.records ? this.state.records.town_city : null}, {this.state.records ? this.state.records.state : null}, {this.state.records ? this.state.records.pin : null}</label><br />

                                            {/* <label for="office" className="pl-2">Location:{records.SingleCheckOutData.first_name} {records.SingleCheckOutData.last_name}</label><br/>
                                            <label for="office" className="pl-2">Location:{records.SingleCheckOutData.location} </label> */}


                                            {/* <hr /> */}
                                            {/* <input type="radio" id="home" name="Address" value="CSS" /> */}
                                            {/* <label for="home" className="pl-2">Name: </label>
                                            <label for="office" className="pl-2">Address: </label> */}


                                            <br />

                                        </form>

                                    </div>

                                </div>
                            </div>
                            {/*Order  */}
                            <div className="col-sm-6 yo">
                                <div className="card yorder">
                                    <div className="card-header bg-success">
                                        <h4 className="text-center text-uppercase text-white font-weight-600">Your Order</h4>
                                    </div>
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>PRODUCTS</th>
                                                    <th>SUBTOTALS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.cart.map((cartItem, index) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-md-5">
                                                                        {/* <p>{cartItem.id}</p> */}
                                                                        <img src={`../assets/img/uploads/${cartItem.img}`} alt="" className='img-fluid w-60' />
                                                                    </div>
                                                                    <div className="col-md-7">
                                                                        <h6 className="mt-5"><a href="#" className="text-decoration-none"><b>{cartItem.name}</b></a></h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{cartItem.count} × ₹{cartItem.price}</td>
                                                        </tr>
                                                    )
                                                })}
                                                <tr>

                                                    <td className="text-uppercase">Subtotal</td>
                                                    <td>₹{this.state.totalPrice}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        <label htmlFor="shipping">  Shipping:</label>
                                                        Free shipping
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>TOTAL</td>
                                                    <td>₹{this.state.totalPrice}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="form-group ">


                                            <label>     <input type="radio"
                                                defaultChecked={this.state.isChecked}
                                                onChange={this.toggleChange}
                                            />
                                                Cash On delivery<br />Pay with cash upon delivery.
                                            </label>
                                            <div className="text-center">
                                                <button className="btn btn-success" onClick={this.handlePlaceHolder}>Place Order</button>
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
export default Check_Out