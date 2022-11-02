import React from 'react';
import Shop_Sidebar from "./shop-sidebar";
import { FaAngleRight, FaAngleDown, FaShoppingCart, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


class Shop extends React.Component {
    handelCart =(name,price,img,id)=>{
        let product = {
            name: name,
            img: img,
            price: parseInt(price),
            id: id
        }
        this.addToCart(product)
        console.log('HEllo');
        let names = name +" has been added to your cart."
        toast(names) 

      //  window.location.reload(false)
      document.getElementById("abc").innerHTML=this.state.cart.length;

    }

    constructor(props) {
        super(props);

        this.state = {
            records: [],
            recordss: [],
            planRecords:[]

        };
        

        this.getSingleProduct = this.getSingleProduct.bind(this);
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
            count: count+1,
        };
        duplicate.push(productToAdd)
        localStorage.setItem('cart', JSON.stringify(duplicate));

    }
}
    componentDidMount() {
        fetch('http://localhost:5000/all_categories')
            .then(response =>
                response.json()
            )
            
            .then(records => {
                console.log("Wwwwwwwwww",records.allProducts);
                this.setState({
                    records: records.allcategory,
                    recordss: records.allProducts
                    
                })
            })
            fetch('http://localhost:5000/all_Subscription_Plan')
            .then((response) => response.json())
            .then(planRecords => {
                this.setState({ planRecords: planRecords });
            });
           
    }

    getSingleProduct(event) {

    }
    render() {
        // console.log("ss",this.state.planRecords);
        return (
            <>
                <div className="container-fluid shop-main">
                    <section className='shop-main-section'>
                        <div className="row">
              <ToastContainer toastStyle={{ backgroundColor: "green" }} />

                            <div className="col-lg-4 col-md-5">
                                <Shop_Sidebar />
                            </div>
                            <div className="col-lg-8 col-md-7">
                                <section className='breadcrumb-section'>
                                    <div className="row">
                                        <div className="col-lg-8 col-md-12">
                                            <ul class="breadcrumb">
                                                <li><a href="/">Home </a><FaAngleRight /></li>
                                                <li>Products</li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-4 col-md-12">
                                            <div className='short-by'>
                                                <span className='text-light'>SHORT BY:DEFAULT</span><a className='float-right text-light angled'><FaAngleDown /></a>

                                            </div>
                                            <div className="card short-by-li" id='lists'>
                                                <div className="card-body">
                                                    <div>
                                                        <ul>
                                                            <li><a href="#"><span>Default</span></a></li>
                                                            <li><a href="#"><span>Popularity</span></a></li>
                                                            <li><a href="#"><span>Newness</span></a></li>
                                                            <li><a href="#"><span>Low Price</span></a></li>
                                                            <li><a href="#"><span>High Price</span></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className='shop-product-s'>
                                    <div className="row">
                                    {
                                            this.state.planRecords.map((plandata) => (
                                        <div className="col-lg-3 col-md-6 text-center">
                                             <Link to={{ pathname: `/Subscribe/${plandata.name.replace(' ', '-')}` }}>
                                                        <img src={`assets/img/uploads/${plandata.image}`} alt="First slide" className='img-fluid' />
                                                    </Link>
                                                <h6>Monthly Subscription</h6>
                                                <h4>{plandata.name}</h4>
                                            <h5>₹{plandata.price}.00</h5>
                                            <div className='product-tool'>
                                                {/* <a href="#" className='tool-button'><FaShoppingCart className='tool' /></a> */}
                                                <button className='tool-button' onClick={() => { this.handelCart(plandata.name, plandata.price, plandata.image, plandata.id) }}><FaShoppingCart className='tool' /></button>
                                                <a href="#" className='tool-button'><FaEye className='tool' /></a>
                                            </div>
                                        </div>
                                           ))
                                        }
                                        {/* <div className="col-lg-3 col-md-6 text-center">
                                            <img src="assets/img/uploads/2022/02/healthy-food-1-300x300.png" alt="" />
                                            <h6>Monthly Subscription</h6>
                                            <h4>Standard Monthly Subscription</h4>
                                            <h5>₹7500.00</h5>
                                            <div className='product-tool'>
                                                <a href="#" className='tool-button'><FaShoppingCart className='tool' /></a>
                                                <a href="#" className='tool-button'><FaEye className='tool' /></a>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 text-center">
                                            <img src="assets/img/uploads/2022/02/healthy-food-300x300.png" alt="" />
                                            <h6>Monthly Subscription</h6>
                                            <h4>Basic Monthly Subscription</h4>
                                            <h5>₹5000.00</h5>
                                            <div className='product-tool'>
                                                <a href="#" className='tool-button'><FaShoppingCart className='tool' /></a>
                                                <a href="#" className='tool-button'><FaEye className='tool' /></a>
                                            </div>
                                        </div> */}
                                        
                                    </div>
                                    <div className="row">
                                    {
                                        this.state.records.map((user) => (
                                        <div className="col-lg-3  col-md-6 text-center">
                                            <Link to={{pathname:`/Product/${user.slug.replace(' ','-')}`}}>
                                            <img src={`assets/img/uploads/${user.image}`} alt="" />
                                            </Link>
                                            <h6>{user.parent_category}</h6>
                                            <h4>{user.name} (1kg)</h4>
                                            <h5>₹{user.price}.00</h5>
                                            <div className='product-tool'>
                                            <a href="#" onClick={()=>{this.handelCart(user.name,user.price,user.image,user.id)}}className='tool-button'><FaShoppingCart className='tool' /></a> 

                                                <a href="#" className='tool-button'><FaEye className='tool' /></a>
                                            </div>
                                        </div>
                                          ))
                                        }
                                        
                                        {/* <div className="col-lg-3 col-md-6 text-center">
                                            <img src="../assets/img/uploads/2022/02/capsi-295x322.png" alt="" />
                                            <h6>Soil Less</h6>
                                            <h4>Capiscum (1kg)</h4>
                                            <h5>₹120.00</h5>
                                            <div className='product-tool'>
                                                <a href="#" className='tool-button'><FaShoppingCart className='tool' /></a>
                                                <a href="#" className='tool-button'><FaEye className='tool' /></a>
                                            </div>
                                        </div> */}
                                        {/* <div className="col-lg-3 col-md-6 text-center">
                                            <img src="assets/img/uploads/2022//01/88-295x322.png" alt="" />
                                            <h6>Fruits</h6>
                                            <h4>Muskmelon (1kg)</h4>
                                            <h5>₹60.00</h5>
                                            <div className='product-tool'>
                                                <a href="#" className='tool-button'><FaShoppingCart className='tool' /></a>
                                                <a href="#" className='tool-button'><FaEye className='tool' /></a>
                                            </div>
                                        </div> */}
                                    </div>
                                    {/* <div className="row">
                                        <div className="col-lg-3 col-md-6 text-center">
                                            <img src="assets/img/uploads/2022/01/67-295x322.png" alt="" />
                                            <h6>Vegetables</h6>
                                            <h4>Baby Potato (1kg)</h4>
                                            <h5>₹50.00</h5>
                                            <div className='product-tool'>
                                                <a href="#" className='tool-button'><FaShoppingCart className='tool' /></a>
                                                <a href="#" className='tool-button'><FaEye className='tool' /></a>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 text-center">
                                            <img src="assets/img/uploads/2022/01/72-295x322.png" alt="" />
                                            <h6>Soil Less</h6>
                                            <h4>Zucchini (Green) (1kg)</h4>
                                            <h5>₹200.00</h5>
                                            <div className='product-tool'>
                                                <a href="#" className='tool-button'><FaShoppingCart className='tool' /></a>
                                                <a href="#" className='tool-button'><FaEye className='tool' /></a>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 text-center">
                                            <img src="assets/img/uploads/2022/01/73-295x322.png" alt="" />
                                            <h6>Vegetables</h6>
                                            <h4>Zucchini (yellow) (1kg)</h4>
                                            <h5>₹200.00</h5>
                                            <div className='product-tool'>
                                                <a href="#" className='tool-button'><FaShoppingCart className='tool' /></a>
                                                <a href="#" className='tool-button'><FaEye className='tool' /></a>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 text-center">
                                            <img src="assets/img/uploads/2022/01/75-295x322.png" alt="" />
                                            <h6>Vegetables</h6>
                                            <h4>LadyFinger (250g)</h4>
                                            <h5>₹54.00</h5>
                                            <div className='product-tool'>
                                                <a href="#" className='tool-button'><FaShoppingCart className='tool' /></a>
                                                <a href="#" className='tool-button'><FaEye className='tool' /></a>
                                            </div>
                                        </div>
                                    </div> */}
                                    <ul class="pagination justify-content-center mt-5">
                                        <li class="page-item active"><a class="page-link" href="/shop">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#"><FaAngleRight /></a></li>
                                        <li class="page-item"><a class="page-link" href="#">Last</a></li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>                
                            </>
        )
    }
}
export default Shop