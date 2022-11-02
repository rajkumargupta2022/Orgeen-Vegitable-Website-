
import CheckOuts from "../models/CheckOutModel.js";
import UserModel from "../models/UserModel.js";


export const CheckOut = async (req, res) => {
  //filename
//   const image = req.file.filename;

  const { first_name, last_name,company_name, country_name, street_address,town_city,state,location,pin,phone,email} = req.body;
  try {
    CheckOuts.create({
          first_name: first_name,
          last_name: last_name,
          company_name: company_name,
          country_name: country_name,
          street_address: street_address,
          town_city:town_city,
          state:state,
          location:location,
          pin:pin,
          phone:phone,
          email:email

      });
      res.status(200).json({ msg: "Biilling added successfully" });
  } catch (error) {
      res.status(400).json({ msg: "Failed" });
  }
}


export const getSingleCheckOut = async (req, res) => {
  // const id = 50;
  console.log("yhhhhhhhhh",req.body);
  console.log("eee",req.params);
  console.log("yhrrhhhhhhhh",req.query);
    try {

  // UserModel.hasMany(CheckOuts, {foreignKey: "id"})
  CheckOuts.hasMany(UserModel, {foreignKey: "id"})
  UserModel.belongsTo(CheckOuts, {foreignKey: "id"})

      const SingleCheckOutData =  await CheckOuts.findOne
      ({
        logging:console.log,
        include: [{
            model: UserModel,
            where: {
                "email": req.query.email
            }
        }]
    })
    // {order: [ [ 'id', 'DESC' ]],}

        res.status(200).json({SingleCheckOutData: SingleCheckOutData});
      } catch (error) {
        res.status(400).json({ msg: "Failed found" });
    }
}

// console.log("cccccccccccccccccccccccc",req.cookies.email);
