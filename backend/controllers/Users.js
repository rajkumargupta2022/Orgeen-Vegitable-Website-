import Users from "../models/UserModel.js";
import OrderModel from "../models/OrderModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const refreshSecret = 'jnXjFgXxrEQGLN5ZO5XJoYi7M075O/t36jNLhrv/72ITvAfGhzB5nIg4AN3xOi8y3tq2lXzRdLyxmGFppKoKz31aSgR89AO9Pois39Ot2x9QV3qzYje6PlfcBUu9rz0kH2cbtCRdc99AZSOrIzPoubzAG6fcAQW/Lgbr/BHetOfpEGrJfzYGkKVf782EYcTJ9Pu1BYROxp9FFRBy60zwJ7Vv2CNT3lgsMRaFbYgO5M/uErBxE3BLmVPBhEPvp6n56zfkzNsmlU1JhaMlZXIaKm5Cfw2sasWNOWS9lj9iE8qQdpos/Iit/XpkZzp7NkWoLMgBsQWAmeCiwK/blmfqIA=='

const secret = 'PlCCXxjIDR6QiEGRGf6BU2wklIpaRKJyT45cHpccxHsgbgVV0S0FsrvS1evDtPehdJx4T17TAxlTODD4lRV8nkpB7WeRltp+mJw2OHNpSAWG4iT38iYhxt/CHMnm9yb30YWfspmukFcfa6vNDBq759/vpP9oT5r5Y0zqxcnrsCykljVzt5P8olJCf6Z4zUrCdk6uHcn0S7cQyqoMrwl7waysREbIF59TZ4TXb10gGOQwKYCdm1B98ao7n9N7hb9jwYYt9b8E//n2x1Y0J1V9UWEFld+lXJhvWkF5yVZXEfdxgaaJKUUCFB6D2253O34rdI+Bfo77VQqkhKCQnqklpA=='

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const { email, name, lname, password, confPassword } = req.body;
    if (email == "") return res.status(400).json({ msg: "Please Enter your Email" });
    if (name == "") return res.status(400).json({ msg: "Please Enter your Name" });
    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password not match" });
    
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await Users.findAll({
        where: {
            email: req.body.email
        }
    });
  
    res.json(user);


    try {

        await Users.create({
            email: email,
            name: name,
            lname: lname,
            password: hashPassword
        });
        //    return res.status(200).json({ msg: "Registration Succesfully" });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    // if ((req.body.email!="")) return res.status(400).json({ msg: "Please Enter Email" });
    
    //  const orderData = await OrderModel.findOne({where: { email: req.body.email }})
    //  if(orderData){
    //     res.status(200).json({orderData: orderData});
    //     console.log("eee",orderData);
    //  }

    try {

        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        })
       

        // console.log("aaaaaa", req.body.email);
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        if ((user[0].email==req.body.email)) {
            const accessToken = jwt.sign({'userId':user[0].id, 'name':user[0].name, 'email':user[0].email}, secret,{
                expiresIn: '1500s'
            });

            const refreshToken = jwt.sign({'userId':user[0].id, 'name':user[0].name, 'email':user[0].email}, refreshSecret,{
                expiresIn: '7d'
            });
            // res.json({ accessToken });
            return res.status(200).json({
                msg: "User found", token: accessToken,refreshToken:refreshToken
            })};
      
    } catch (error) {
        res.status(404).json({ msg: "Email Id not Exit" });
    }
}

export const UpdatePassword = async (req, res) => {
    // const { currentPaasword, newPassword, confirmPassword,email} = req.body;
     if (req.body.newPassword !== req.body.confirmPassword) return res.status(400).json({ msg: "Password and Confirm Password did not Match" });
 
     
    const user = await Users.findOne({
        where: {
            email:req.body.email
            // email:"rajkumar@gmail.com"
        }
    });

    // if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password not match" });
    
    // const salt = await bcrypt.genSalt();
    // const hashPassword = await bcrypt.hash(password, salt);
   
  
    // res.json(user);


    try {
        
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(req.body.newPassword, salt);
        // console.log("ppppp",req.body.newPassword);
        const match = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        await Users.update({password: password}, {
            where: { "email": user.email }
        });
            return res.status(200).json({ msg: "Password Updated Succesfully" });
    } catch (error) {
        console.log(error);
    }
}


export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}