import React  from "react";
import Select from 'react-select';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Category_Form extends React.Component {

constructor(props) {
  super(props);
  this.state = { img: "" };
  this.handleChangeImage = this.handleChangeImage.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state = {
    subscription_type:"",
           name: "",
           discount_percentage:"",
          price: "",
          profile_pic: ''
  }
}

  handleCategory = (e) => {
    this.setState({ [e.target.subscription_type]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.discount_percentage]: e.target.value });
    this.setState({ [e.target.price]: e.target.value });

  }
  //   handleParentCategory = (e) => {
  //   this.setState({ parent_category: e.value });
  // }

handleChangeImage(e) {
  this.setState({ profile_pic: e.target.files[0] })
  console.log(e.target.files[0]);
  this.setState({ img: URL.createObjectURL(e.target.files[0]) })

  // return false
}
handleSubmit(e) {
  e.preventDefault()
  const formData = new FormData()
  formData.append('profile_pic', this.state.profile_pic)
  formData.append('subscription_type', this.state.subscription_type)
  formData.append('name', this.state.name)
  formData.append('discount_percentage', this.state.discount_percentage)
  formData.append('price', this.state.price)
  axios.post("http://localhost:5000/add_subscription_plan", formData, {
  }).then(res => {
      console.log(res)
      toast("Suscription Plan Added Successfully!") 
  })
}


  render() {
    const {subscription_type,discount_percentage, name, price, image } = this.state
    return (

      <>
      
        <div className="loader"></div>
        <div id="app">
          <div className="main-wrapper main-wrapper-1">

            {/* <!-- Main Content --> */}
            <div className="main-content row">

              <div className="col-md-2 col-lg-2">
              <ToastContainer toastStyle={{ backgroundColor: "lightgrey" }} />
              </div>
              <div className="col-12 col-md-8 col-lg-8">
                <div className="card">
                  <div className="card-header text-center">
                    <h4 className="text-uppercase">Add Subscription Plan</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">  
                        <label htmlFor="name">Subscription Plan type</label>
                        <input type="text" name="subscription_type" className="form-control" value={subscription_type} onChange={this.handleCategory} required/>
                      </div>
                      <div className="form-group">  
                        <label htmlFor="name">Plan Name</label>
                        <input type="text" name="name" className="form-control" value={name} onChange={this.handleCategory} required/>
                      </div>
                      <div className="form-group">  
                        <label htmlFor="name">Discount Percentage</label>
                        <input type="number" name="discount_percentage" className="form-control" value={discount_percentage} onChange={this.handleCategory} required/>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="slug">Price </label>
                        <input type="number" name="price" className="form-control" value={price} onChange={this.handleCategory} required/>
                      </div>
                      {/* <div className="form-group">
                        <label htmlFor="parent_category">Parent Category</label>

                        <Select name="parent_category"
                            options={options} onChange={this.handleParentCategory} />                      
                      </div> */}
                      <div className="form-group row">
                        <div className="col-lg-6">
                          <label htmlFor="image">Image</label>
                          <input name="profile_pic" type="file" className="form-control" accept='image/*' onChange={this.handleChangeImage} />
                        </div>
                        <div className="col-lg-6">
                          <img src={this.state.img} alt="No Image" id="img" style={{ height: "150px" }} value={image} onChange={this.handleImage} />
                        </div>
                      </div>

                      <div className="card-footer text-right">
                        <button className="btn btn-primary mr-1 text-uppercase" type="submit" onClick={this.handleAlert}>Add</button>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-lg-2"></div>
            </div>
          </div>
        </div>

      </>
    )
  }
}

export default Category_Form