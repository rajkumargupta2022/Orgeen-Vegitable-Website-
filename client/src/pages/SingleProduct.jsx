import React from 'react';
import {FaHeart,FaShareAlt,FaShoppingCart,FaEye} from 'react-icons/fa';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';


class SingleProduct extends React.Component


{   

    handelCart =(e)=>{
        e.preventDefault()
        let product = {
            name: this.state.records.name,
            img: this.state.records.image,
            sale: this.state.records.sale,
            id: this.state.records.id
        }
        this.addToCart(product)
        console.log('HEllo');
        let names = this.state.records.name +" has been added to your cart."
          toast(names) 

    }

    addToCart = (product)=>{
        const cart = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) :
        [];

    // check if duplicates
    const duplicates = cart.filter(cartItem => cartItem.id === product.id);

    // if no duplicates, proceed
    if (duplicates.length === 0) {
        // prep product data
        const productToAdd = {
            ...product,
            count: 1,
        };

        // add product data to cart
        cart.push(productToAdd);

        // add cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

    }else{
        const count = duplicates[0].count
        let duplicate = cart.filter(cartItem => cartItem.id !== product.id);
        const productToAdd = {
            ...product,
            count: this.state.clicks,
        };
        duplicate.push(productToAdd)
        localStorage.setItem('cart', JSON.stringify(duplicate));

    }
}

    constructor(props) {
        super(props);
        this.state = {
            records: [],
            clicks:1,
            show:true
        };
        
    }

     IncrementItem = () => {
         if (this.state.clicks < 10) {
             this.setState({
                 clicks: this.state.clicks + 1
             });
         }
     }

     DecreaseItem = () => {
         if (this.state.clicks > 1) {
             this.setState({
                 clicks: this.state.clicks - 1
             });
         }
     }
    
    componentDidMount() {
        const ids = window.location.href.split("/")[4];
       const res = ids.replace(/-/g, " ");
    //    alert(res);
        const slug = {
          "slug": res
        }
      
       

        axios.post('http://localhost:5000/SingleProduct', slug)
        .then(records => {
            this.setState({
                records: records.data.pData 
            })
            console.log("hhssiiiiiiii",records.data.pData)

        })
    
    
    //     axios.post('http://localhost:5000/SingleHomeProduct', name)
    //     .then(records => {
    //         this.setState({
    //             records: records.data.data 
    //         })
    //         console.log("hhssiiiiiiii",records.data.data)

    //     })
    
        
    }


    
    render()
    {
        if (this.state.records.ProductStocks==1) {
            var stock = "";
          }
          else if(this.state.records.ProductStocks==2) {
            var stock = "Out Of Stock";
          }
          else{
            var stock = "Comming Soon";


          }
        
        return(
            <>
             <div className="container-fluid bg-main">
                 <section className='single-product-s'>
                     <div className="row">
              <ToastContainer toastStyle={{ backgroundColor: "green" }} />

                         <div className="col-lg-5 pt-5 pb-5 col-sm-12 col-md-5">
                             <div className='single-img'>
                             <InnerImageZoom  src={`../assets/img/uploads/${this.state.records.image}`} zoomSrc={`../assets/img/uploads/${this.state.records.image}`} zoomType="hover" zoomPreload={true} />
                             </div>
                         </div>
                         <div className="col-lg-1 col-md-1"></div>
                         <div className="col-lg-6 pt-5 pb-lg-5  col-sm-12 col-md-6">
                             <div className='single-details'>
                        
                                      <span style={{color: "red"}}>{stock}</span>
                                 <h3>{this.state.records.name}({stock})</h3>
                             
                               
                                 <h6 className='mt-3 tags'><span>Tags</span> <a href='#' className='ml-4'>monthly subscription,</a>  <a href='#'>subscribe</a></h6>
                                 <h3 className='mt-4'>₹{this.state.records.sale}.00</h3>
                                 <div className='sn-para'>
                                     <h4 className='mt-3'>{this.state.records.description}.</h4>
                                     {/* <h4 className='mt-3'>Subscribe to the Premium Subscription plan with 10% on every order for the entire month along with free shipping throughout the month. Also, get a privilege pass for you and your 3 friends to visit the Orgeen farms and see the process of Hydroponics, Soil less cultivation and how we grow the microgreens.</h4> */}
                                 </div>
                                 <form className='cart pt-3 pb-3'>                                   
                                 <div className="quantity">
                                    <label for="quantity" className='text-light pl-4 pr-lg-4 quant'>Quantity :</label>
                                     <input type="button" onClick={this.IncrementItem} value="+" />
                                    { <span className='cartValue' >{ this.state.clicks }</span> }

                                    <input type="button" onClick={this.DecreaseItem} value="-" />
                                    <button onClick={this.handelCart} className='button-g ml-lg-5 ml-3'><span>ADD TO CART</span></button>
                                 </div>                                 
                                 </form>
                                 <div className="share-wish d-flex pt-4">
                                       <a href=""><h3>Share <FaShareAlt className='s-w-ic ml-2'/></h3></a>
                                        <a href="" className='ml-5'><h3>Wishlist <FaHeart className='s-w-ic ml-2'/></h3></a>
                                   </div>                             
                             </div>
                         <h6 className='mt-3 tags'><span>Category</span> <a href='#' className='ml-4'>Monthly Subscription,</a></h6>
                         </div>
                     </div>
                    <div className='product-add-i'>
                   <div className="row mt-5">                       
                           <div className="col-lg-5 col-sm-12 col-md-5">
                              <ul className='add-h float-right'>
                                  <li className='mr-5'><h4>Additional information</h4></li>
                              </ul> 
                           </div>
                           <div className="col-lg-7 mb-5 add-i-t col-sm-12 col-md-7">
                               <table className='table table-striped  table-bordered ml-lg-5 table-responsive'>
                                   <tr className='bg-gr'>
                                       <th>Brand:</th>
                                       <td>Organic Friuts</td>
                                   </tr>
                                   <tr >
                                       <th>Weight:</th>
                                       <td>2.5 kg</td>
                                   </tr>
                                   <tr className='bg-gr'>
                                       <th>Dimensions:</th>
                                       <td>12 × 23 × 56 cm</td>
                                   </tr>
                                   <tr>
                                       <th>Categories:</th>
                                       <td>Vegetables</td>
                                   </tr>
                                   <tr className='bg-gr'>
                                       <th>Size:</th>
                                       <td>Medium</td>
                                   </tr>
                               </table>
                           </div>                      
                       </div> 
                       </div>
                       <div className='related-product pt-5 pb-5'>
                         <h1 className='related-h text-center mt-4 mb-5'>Related Products</h1>
                         <div className="row">
                             <div className="col-lg-3 col-md-3 col-sm-12 text-center">                            
                      <a href=""> <img className='msp-img img-fluid' src="../assets/img/uploads/2022/02/healthy-food-1-300x300.png" alt="" />
                          <div className='product-tool'>
                           <a href="#" className='tool-button'><FaShoppingCart className='tool'/></a>
                               <a href="#" className='tool-button'><FaEye className='tool'/></a>
                                </div>
                          <h6>Monthly Subscription</h6>
                        <h4>Standard Monthly Subscription</h4></a>
                        <h5>₹7500.00</h5>
                          </div> 
                             <div className="col-lg-3 col-md-3 col-sm-12 text-center">
                             <a href=""><img className='msp-img img-fluid' src="../assets/img/uploads/2022/02/healthy-food-300x300.png" alt="" />
                          <div className='product-tool'>
                           <a href="#" className='tool-button'><FaShoppingCart className='tool'/></a>
                               <a href="#" className='tool-button'><FaEye className='tool'/></a>
                                </div>
                          <h6>Monthly Subscription</h6>
                        <h4>Basic Monthly Subscription</h4></a> 
                        <h5>₹5000.00</h5>                 
                      </div>
                             <div className="col-lg-3 col-md-3 col-sm-12"></div>
                             <div className="col-lg-3 col-md-3 col-sm-12"></div>
                         </div>
                       </div>
                 </section>
             </div>
            </>
        )
    }
}

export default SingleProduct