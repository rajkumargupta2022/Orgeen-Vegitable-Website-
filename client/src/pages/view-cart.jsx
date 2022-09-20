import React from "react";
import { Link } from 'react-router-dom';

class View_Cart extends React.Component {
    calTotalPrice = (cart)=>{
        let totalPrice = 0
        cart.map((item)=>{
          let itemPrice = item.count * parseInt(item.price)
          totalPrice += itemPrice 
        })
        return totalPrice
      }
      constructor(props) {
        super(props);

      this.state = {
        // Get value from localStorage or use default
          cart: localStorage.getItem('cart') ?
          JSON.parse(localStorage.getItem('cart')) : [],
          totalPrice : localStorage.getItem('cart') ?
          this.calTotalPrice(JSON.parse(localStorage.getItem('cart'))) : 0
  
  
      }
      window.addEventListener('storage', (e) => this.storageChanged(e));
  }

  handleCheckOut(event){
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name] : event.target.value
    })
  }
//        handleParentCategory = (e) => {
//     this.setState({ parent_category: e.value });
//   }
  storageChanged(e) {
    console.log('Storage Change');
    if (e.key === 'cart') {
      this.setState({
        cart: JSON.parse(e.newValue)
      })
    }
  }
  hideCartRemove = (event) => {
    console.log("sssssssssssss", event.target.dataset.id);
      const oldCart = JSON.parse(localStorage.getItem('cart'))
      if (oldCart){
        const newCart = oldCart.filter((item)=>item.id!=event.target.dataset.id)
        localStorage.setItem('cart',JSON.stringify(newCart))
        window.location.reload(false);
      } else{
        alert("Please Insert the Item")
      }
  };
      
    render() {
        return (
            <>
                    <div className="container-fluid view-cart-main bg-main">
                    <section className='view-cart-section pb-5 pt-3'>
                        <div className="row">
                            <p className="mt-4">Order articles worth Rs. 299 or more and receive a piece of bottle gourd worth Rs. 36 absolutely free!</p>
                            <div className="col-md-7">
                            <div className="card">                 
                    <div className="card-header">
                      <h4 className="text-center text-uppercase text-success font-weight-bold">Shopping bag</h4>
                    </div>
                    <div className="card-body">                                
                                <table className="table table-bordered bg-white text-center table-responsive">
                                    <thead>
                                        <tr>
                                            <th>PRODUCT</th>
                                            <th>PRICE</th>
                                            <th className="w-14 text-uppercase">Quantity</th>
                                            <th>SUBTOTAL</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                    {this.state.cart.map((cartItem,index)=>{
                                      return(
                                        <tr>
                                            <td>
                                                <div className="row">
                                                <div className="col-md-2">
                                                <input
                              className="btn-danger px-3 py-1 border-0"
                              type="button"
                              data-id={cartItem.id}
                              value="X"
                              onClick={this.hideCartRemove}
                            />
                            </div>
                                                    <div className="col-md-5">
                                                    
                       
                        
                                                        <img src={`../assets/img/uploads/${cartItem.img}`}  alt="" className='img-fluid w-60' />
                                                    </div>
                                                    <div className="col-md-7">
                                                        <h6 className="mt-5"><a href="#" className="text-decoration-none"><b>{cartItem.name} (150g-200g)</b></a></h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="mt-4">₹{cartItem.price}.00</td>
                                            <td className="mt-5"><input type="number" name="quantity" className="w-100"/></td>
                                            <td>₹{cartItem.count*cartItem.price}.00</td>
                                        </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>

                                </div>
                                </div>
                                <form>
                                <div className="coupon row mt-5">                                    
                                    <div className="col-md-6">
                                    <input type="text" placeholder="Coupon Code" className="form-control border-0 mt-2"/>
                                    </div>
                                    <div className="col-md-6">
                                    <input type="button" value="APPLY COUPON" className="ac mt-sm-2"/>
                                    <input type="button" value="UPDATE CART"  className="up mt-sm-2 float-right"/>
                                    </div>                       
                                </div>
                                </form>
                            </div>
                            <div className="col-md-5">
                            <div className="card">                 
                    <div className="card-header">
                      <h4 className="text-center text-uppercase text-success font-weight-bold">Cart Totals</h4>
                    </div>
                    <div className="card-body">                               
                                <div className=" bg-white text-center">
                                    <div className="row pt-2">
                                        <div className="col-md-6">
                                            Subtotal
                                        </div>
                                        <div className="col-md-6">
                                            ₹{this.state.totalPrice}.00
                                        </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-12">
                                            <h6>
                                                Shipping
                                            </h6>
                                            <h6>
                                                Free shipping
                                            </h6>
                                            <h6>
                                                Shipping to India, Lucknow 226010, Uttar Pradesh.
                                            </h6>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row pb-3">
                                        <div className="col-md-6">
                                        Total
                                        </div>
                                        <div className="col-md-6">
                                            ₹{this.state.totalPrice}.00
                                        </div>
                                        </div>
                                        <hr />
                                        <Link to="/check" className="btn btn-success mb-3 text-white">PROCEED TO CHECKOUT</Link>
                                        {/* <a href="/check-out" className="btn btn-success mb-3 text-white">PROCEED TO CHECKOUT</a> */}
                                    
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
export default View_Cart