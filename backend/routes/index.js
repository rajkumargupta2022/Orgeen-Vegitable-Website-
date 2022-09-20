import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { SingleProduct,SingleHomeProduct,Category,getSingleAddData, getCategories, deleteCategories, updateCategories, getSingleCategory } from "../controllers/Categories.js";
import { Product, getProducts, deleteProducts, updateProducts, getSingleProduct } from "../controllers/Products.js";
import { PlaceOrder,OrderData } from "../controllers/OrderController.js";
import { CheckOut, getSingleCheckOut } from "../controllers/CheckOut.js";
import { AddSubscriptionPlan,getSubscriptionPlan,getSingleSubscriptionPlan,updateSubscriptionPlan,deleteSubscriptionPlan,SingleSubscribe } from "../controllers/AddSubscription.js";
import path from 'path';
import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/assets/img/uploads/')
    },
    filename: function (req, file, cb) {

        var ext = path.extname(file.originalname);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })


const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
//cotegry 
router.post('/category_form',upload.single('profile_pic'), Category);
// upload.single('profile_pic'),
router.get('/all_categories', getCategories);
router.post('/api/update_categories', updateCategories);
router.post('/single_categories', getSingleCategory);
router.post('/delete_categories', deleteCategories);
router.post('/addtoSingleData', getSingleAddData);

router.post('/SingleProduct', SingleProduct);
router.post('/SingleHomeProduct', SingleHomeProduct);
// SingleProduct

//products
router.post('/product_form',upload.single('profile_pic'), Product);
router.get('/all_products', getProducts);
router.post('/api/update_products', updateProducts);
router.post('/single_products', getSingleProduct);
router.post('/delete_products', deleteProducts);

//checkOut
router.post('/check-out', CheckOut);
router.get('/getsingleCheckOut', getSingleCheckOut);

// Order
router.post('/placeOrder', PlaceOrder);
router.get('/orderData', OrderData);

// add subscription Plan
router.post('/add_subscription_plan',upload.single('profile_pic'), AddSubscriptionPlan);
router.get('/all_Subscription_Plan', getSubscriptionPlan);
router.post('/api/update_subscription_plan',upload.single('profile_pic'), updateSubscriptionPlan);
router.post('/single_subscription_plan', getSingleSubscriptionPlan);
router.post('/delete_subscription_plan', deleteSubscriptionPlan);
router.post('/single_subscribe', SingleSubscribe);





export default router;