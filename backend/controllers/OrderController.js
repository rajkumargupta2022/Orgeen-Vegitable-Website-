
import OrderModel from "../models/OrderModel.js";
import SubOrderModel from "../models/SubOrderModel.js";
import SubscriptionModel from "../models/AddSubscriptionModel.js";
import CheckOuts from "../models/CheckOutModel.js";
import nodemailer from "nodemailer";
// import localStorage from "node-localstorage"

export const  PlaceOrder = async (req, res) => {
  console.log("Gggggggggggggggggggggggggg");
  // const {	name} = req.body;
  // sessionStorage.getItem('email')
  console.log("email=", localStorage.getItem('email'));

  const allProducts = await OrderModel.findOne({order: [ [ 'id', 'DESC' ]],});
  const order=allProducts.dataValues.order_number;
  const myYear = order.substring(3);
  const oldYear = parseInt(myYear)
  const year= oldYear+1;
  const order_number= "ORG"+year;

  const {product_id,	category_id} = req.body;

  const { email,user_id, total_price} = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rajkumarbfcsofttech@gmail.com',
      pass: 'dmpycgstaxmxdbif',
    },
  });
  
  
  transporter.sendMail({
    from: 'rajkumarbfcsofttech@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Orgeen ", // Subject line
    text: "There email from Orgeen Your Order Confirmed", // plain text body
    html: "<b>There email from Orgeen Your Order Confirmed  </b>", // html body
  }).then(info => {
    console.log({info});
  }).catch(console.error);

  if(req.body.cod==true){
    var cod ="Payment Final";
  }
  else{
    var cod ="Cash On Delivery";

  }


 if(total_price > 5000){
    OrderModel.create({
          email,
          user_id,
          total_price,
          cod,
          order_number

      });
    }else{
      OrderModel.create({
        user_id,
        total_price,
        cod,
        order_number

    });
    }
      SubOrderModel.create({
        order_number: order_number,
        sub_total: total_price,
        product_id: product_id,
        category_id:category_id

    });
    
      res.status(200).json({ msg: "Your Order Placed Successfully" });
  
}

export const OrderData = async (req, res) => {
  
//  const email= localStorage.getItem("email");
//  const email=  sessionStorage.getItem(email)
  // console.log("qqqq",req.body.email);
    try {

        const allOrder = await OrderModel.findAll();
        const address = await CheckOuts.findOne({order: [ [ 'id', 'DESC' ]],})
      //  console.log("aaaaaa",address);
//{where:{"parent_category" : 2}}
        res.status(200).json({allOrder: allOrder,address: address});
    } catch (error) {
        res.status(400).json({ msg: "Failed found" });
    }
}



export const SubOrder = async (req, res) => {
  
    const { order_number, div_type,flag} = req.body;
    try {
      
        // let items = req.body.map(item => {
        //   return {
        //     order_number: order_number,
        //     div_type: div_type,
        //     flag: flag
        //   };
        // });
        // Tables.create(items);
        
        res.status(200).json({ msg: "Your Order Placed Successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Failed" });
    }
  }

  export const SubOrderLocal = async (req, res) => {
  
    const { order_number, sub_total,product_id,	category_id} = req.body;
    try {
      
        SubOrderModel.create({
            order_number: order_number,
            sub_total: sub_total,
            product_id: product_id,
            category_id:category_id
  
        });
        res.status(200).json({ msg: "Your Order Placed Successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Failed" });
    }
  }

/// dmpycgstaxmxdbif


