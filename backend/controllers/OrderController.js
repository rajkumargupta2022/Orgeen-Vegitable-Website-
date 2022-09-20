
import OrderModel from "../models/OrderModel.js";
import SubOrderModel from "../models/SubOrderModel.js";
import SubscriptionModel from "../models/AddSubscriptionModel.js";

// import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");


export const  PlaceOrder = async (req, res) => {

  const allProducts = await OrderModel.findOne({order: [ [ 'id', 'DESC' ]],});
  const order=allProducts.dataValues.order_number;
  const myYear = order.substring(3);
  const oldYear = parseInt(myYear)
  const year= oldYear+1;
  const order_number= "ORG"+year;


  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'rajkumarbfcsofttech@gmail.com',
  //     pass: 'BFC@2022'
  //   }
  // });
  
  // var mailOptions = {
  //   from: 'rajkumarbfcsofttech@gmail.com',
  //   to: 'rajkumargupta84952@gmail.com',
  //   subject: 'Sending Email using Node.js',
  //   text: 'That was easy!'
  // };
  
  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });

  if(req.body.cod==true){
    var cod ="Payment Final";
  }
  else{
    var cod ="Cash On Delivery";

  }


  const {product_id,	category_id} = req.body;

  const { email,user_id, total_price} = req.body;

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
  const id = req.body.id;

    try {

        const allOrder = await OrderModel.findAll();
       
//{where:{"parent_category" : 2}}
        res.status(200).json({allOrder: allOrder});
    } catch (error) {
        res.status(400).json({ msg: "Failed found" });
    }
}



export const SubOrder = async (req, res) => {
  
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




