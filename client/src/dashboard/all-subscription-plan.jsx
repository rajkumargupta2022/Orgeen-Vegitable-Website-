import React from "react";
import Select from 'react-select';
import $, { event } from 'jquery';
import { MDBDataTable } from "mdbreact";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Categories extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      img: "",
      id: "",
      name: "",
      subscription_type: "",
      price: "",
      profile_pic: ""


    };
    this.state = {
      records: []

    };

    this.getSingleCategory = this.getSingleCategory.bind(this);
    }

 
  componentDidMount() {
    fetch('http://localhost:5000/all_Subscription_Plan')
    .then((response) => response.json())
    .then(records => {
        this.setState({ records: records });
    });
}

  deleteRow(event) {

    confirmAlert({
      
      title: 'Confirm to Delete',
      message: 'Are you sure want to Delete ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
    // alert(event.target.dataset.id);

            const data = {
              "id": event.target.dataset.id
            }
            axios.post('http://localhost:5000/delete_subscription_plan', data)
              .then(res => console.log("data",res.data));
            window.location.reload(false);
          }
        },
        {
          label: 'No',
          onClick: () => { return false; }
        }
      ]
    });

  }

  handleChangeImage = e => {
    this.setState({ profile_pic: e.target.files[0] })
  //  alert(e.target.files[0]);
    this.setState({ img: URL.createObjectURL(e.target.files[0]) })

  }
  getSingleCategory(event) {
    // alert(event.target.dataset.id);    
    const datas = {
      "id": event.target.dataset.id
    }
    event.preventDefault();
    axios.post('http://localhost:5000/single_subscription_plan', datas)
      .then(res => {
        this.setState({ id: res.data.id });
        this.setState({ subscription_type: res.data.subscription_type });
        this.setState({ name: res.data.name });
        this.setState({ price: res.data.price });

      });
  }

  handleUpdate = (e) => {
    e.preventDefault()
    // const multipleValues = $( "#parent_category" ).value();
    const updatedata = {
      "id": this.state.id,
      "subscription_type": e.target[1].value,
      "name": e.target[2].value,
      "price": e.target[3].value
    }
    console.log("hello", e.target)
    axios.post('http://localhost:5000/api/update_subscription_plan', updatedata)
      .then(response => {
        console.log(response)
        window.location.reload(false);
      })
      .catch(error => {
        console.log(error)
      })

  }
loaded () {
    toast("Category Updated Successfully!")

  }

  /* 
  handleParentCategory = (e) => {
    this.setState({ parent_category: e.value });
  } */

  render() {
    const { id,subscription_type, name, price } = this.state
    const data = {
      columns: [
        {
          label: "Id",
          field: "SrNo",
          sort: "asc",
          width: 150,
        },
        {
          label: "Subscription Plan Type",
          field: "subscription_type",
          sort: "asc",
          width: 100,
        },
        {
            label: "Name",
            field: "name",
            sort: "asc",
            width: 150,
          },
        {
          label: "Price",
          field: "price",
          sort: "asc",
          width: 270,
        },

        {
          label: "Image",
          field: "image",
          sort: "asc",
          width: 150,
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 150,
        },


      ],
      rows: this.state.records.map((item, index) => {
        return {
          SrNo: index + 1,
          name: item.name,
          subscription_type: item.subscription_type,
          // INVNAME: <a href="javascript:void(0)" onClick={() => this.check(item.email)}>{item.name}</a>,
          
          price: item.price,
          image:  <img src={`assets/img/uploads/${item.image}`} alt="First slide" className='img-fluid' height="50" width="60px" />,
          action: <div className="text-center"><input className="btn-primary px-3 py-1 border-0" type="button" value="EDIT" data-toggle="modal" data-target="#exampleModal" onClick={this.getSingleCategory} data-id={item.id} />  <input className="btn-danger px-3 py-1 border-0" type="button" data-id={item.id} value="DELETE" onClick={this.deleteRow} /></div>,
        }
      })
    };
    return (
      <>

        <div className="loader"></div>
        <div id="app">
          <div className="main-wrapper main-wrapper-1">
            {/* <!-- Main Content --> */}
            <div className="main-content" onload="loaded();">
              <ToastContainer toastStyle={{ backgroundColor: "lightgrey" }} />
              <section className="section">
                <MDBDataTable striped bordered small data={data} />

              </section>
              {/* model */}
              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="formModal"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="formModal">Update Subscription Plan</h5>
                      {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button> */}
                    </div>
                    <div class="modal-body">
                      <form onSubmit={this.handleUpdate}>
                        <div className="form-group">

                          <input type="hidden" name="id" className="form-control" id="id" value={id} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Subscription Type</label>
                          <input type="text" name="subscription_type" className="form-control" id="name" defaultValue={subscription_type} onChange={this.getSingleCategory} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input type="text" name="name" className="form-control" id="name" defaultValue={name} onChange={this.getSingleCategory} />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="slug">Price</label>
                          <input type="text" name="slug" className="form-control" defaultValue={price} onChange={this.getSingleCategory} id="slug" />
                        </div>
                    

                        <div className="form-group row">
                          <div className="col-lg-6">
                            <label htmlFor="image">Image</label>
                            <input name="profile_pic" type="file" className="form-control" accept='image/*' onChange={this.handleChangeImage} />
                          </div>
                          <div className="col-lg-6">
                            <img src={this.state.img} alt="No Image" id="img" style={{ height: "150px" }} />
                          </div>
                        </div>

                        <div className="text-right">
                          <button className="btn btn-primary mr-1 text-uppercase"  type="submit">Update</button>

                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* model */}
            </div>
          </div>
        </div>


      </>


    )
  }
}
export default Categories