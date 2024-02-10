import { Router } from "express";
import userController from "../Controller/userController.js";
import postController from "../Controller/postController.js";

const router = Router();

// User Api routes
router.post('/createuser', userController.createUser);
router.get('/userposts', userController.userPosts);
router.get('/getusers', userController.getUsers);
router.get('/getuserwithid', userController.getUserDetailsWithId);

// All User Post Api routes
router.post('/createpost', postController.createPostHandler);
router.post('/updatepost', postController.updatePostHandler);
router.delete('/deletepost', postController.deletePostHandler);


export default router;