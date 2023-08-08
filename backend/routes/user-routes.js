import express from "express";
import { getAllUsers, login, signup, updateNotification,getNotifications, getUserById, deleteNotifications} from "../controllers/user-controller.js";

export const router=express.Router();

router.get("/",getAllUsers);
router.post("/signup",signup);
router.post("/login",login);
router.put("/notificationupdate/:id",updateNotification);
router.get("/getnotification/:id",getNotifications);
router.get("/:id",getUserById);
router.put("/deleteNotifications/:id",deleteNotifications);
 




