import UserModel from "../models/User.js";

class AdminController {
  static userDelete = async (req, res) => {
    try {
      const emailToDel = req.body.delEmail;

      const userToDel = await UserModel.findOne({ email: emailToDel });
      if (!userToDel) {
        res.send({
          status: "failed",
          message: "No user found with the specified email",
        });
        return;
      } else {
        await UserModel.deleteOne({ email: emailToDel });
        res.send({ status: "success", message: "Email deleted" });
        return;
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Invalid email" });
    }
  };
}

export default AdminController;
