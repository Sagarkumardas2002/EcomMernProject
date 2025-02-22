import express from 'express'
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testController, updateProfileController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST 
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController)

//test routes
router.get('/test', requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (_req, res) => {
    res.status(200).send({ ok: true });
})

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (_req, res) => {
    res.status(200).send({ ok: true });
})

//update profile
router.put('/profile', requireSignIn, updateProfileController)

//orders
router.get('/orders', requireSignIn, getOrdersController)

//all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

// orders  status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)



export default router;
