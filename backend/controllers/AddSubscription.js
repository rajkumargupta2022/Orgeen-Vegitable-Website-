import SubscriptionModel from "../models/AddSubscriptionModel.js";


export const AddSubscriptionPlan = async (req, res) => {

  const image = req.file.filename;
// console.log("vg",image);

    const { subscription_type, name,discount_percentage, price,} = req.body;
  //  if(!name || !slug || !parent_category ||!regular ||!sale){
  //       return res.status(422).json({ error: "All Fields are Required"})
  //  }
    try {
        SubscriptionModel.create({
            subscription_type: subscription_type,
            name: name,
            discount_percentage: discount_percentage,
            price: price,
            image: image
            
        });
        res.status(200).json({ msg: "Subscription Plan  added successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Failed" });
    }
}

//get data
export const getSubscriptionPlan = async (req, res) => {
    try {
        const allPlan = await SubscriptionModel.findAll();
        res.json(allPlan);
        console.log(allPlan);
    } catch (error) {
        res.status(200).json({ msg: "Failed found" });
    }
}


export const getSingleSubscriptionPlan = async (req, res) => {
  
    const id = req.body.id;
    SubscriptionModel.findByPk(id)
      .then(data => {
        if (data) {
         
          res.json(data.dataValues);
        } else {
          res.status(404).send({
            message: `Cannot find category with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving category with id=" + id
        });
      });
      
    };
  
  // update
  
  export const updateSubscriptionPlan = async (req, res) =>
  {
  const id = req.body.id;
// console.log("iiiii",req.file.filename);

  console.log(id);
  SubscriptionModel.update(req.body, {
        where: { "id": id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Subscription Plan was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update category with id=${id}. Maybe category was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating category with id=" + id
          });
        });
  }
//delete

export const deleteSubscriptionPlan = async (req, res) => {
    
    const id = req.body.id;
    
    SubscriptionModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Subscription Plan deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Plan was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete category with id=" + id
      });
    });
};

export const SingleSubscribe = async (req, res) => {
    const name = req.body.name;
    
  try {
    const SingleData = await SubscriptionModel.findOne({where:{"name" : name}});
     
  //{where:{"parent_category" : 2}}
      const data = {
          "status":200,
          "msg":"success",
          "data":SingleData
      }
      res.status(200).json(data);
      // console.log("mmmmmmmmmm",data);
  } catch (error) {
      res.status(400).json({ msg: "Failed found" });
  }
  
  };


  
 