import express from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
import LoggingController from "../controllers/loggingController.js";
import AdminController from "../controllers/adminController.js";
import checkAdminAuth from "../middlewares/adminauth-middleware.js";

// ROute Level Middleware - To Protect Route
router.use("/changepassword", checkUserAuth);
router.use("/loggeduser", checkUserAuth);

//Logging Middleware before sending request
router.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (data) {
    LoggingController.logToCsv(req, data);
    originalSend.call(this, data);
  };
  next();
});

// Public Routes
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);
router.post(
  "/send-reset-password-email",
  UserController.sendUserPasswordResetEmail
);
router.post("/reset-password/:id/:token", UserController.userPasswordReset);

// Protected Routes
router.post("/changepassword", UserController.changeUserPassword);
router.get("/loggeduser", UserController.loggedUser);

//admin rutes
router.use("/deleteuser", checkUserAuth);
router.use("/deleteuser", checkAdminAuth);
router.post("/deleteuser", AdminController.userDelete);

export default router;
