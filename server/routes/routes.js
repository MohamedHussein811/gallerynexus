const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UsersController");
const UploadController = require("../controllers/UploadController2");
const ArtController = require("../controllers/ArtController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", (req, res) => {
  res.json("404 Not Found");
});

// User Routes
router.get("/users", authenticateToken, UserController.getAllUsers);
router.get("/getuser/:userId", UserController.getUserById);
router.get("/getuserbyusername/:username", UserController.getUserByUsername);
router.post("/createUser", UserController.createUser);
router.post("/login", UserController.login);
router.post("/activateUser", UserController.activateUser);
router.post("/updateProfileByUsername/:name", authenticateToken, UserController.updateProfileByUsername);

// ArtWork Routes
router.get("/getartworkbycategory/:category", ArtController.getArtworkByCategory)
router.get("/getartworkbyid/:id", ArtController.getArtworkByID)
router.get("/cart/:userId", authenticateToken, ArtController.getUserCart)
router.get("/getuserorders/:userId", authenticateToken, ArtController.getUserOrders)
router.post("/addartwork/:userId", authenticateToken, ArtController.createArt);

router.post("/addauction", authenticateToken, ArtController.createAuction);
router.post("/updateauctionprice", authenticateToken, ArtController.updateAuctionPrice);

router.get("/getallauctions", ArtController.getallAuctions)
router.get("/getauctionbyid/:id", ArtController.getAuctionByID)

router.post("/addtocart", authenticateToken, ArtController.addToCart);
router.post("/placeorder/:userId", authenticateToken, ArtController.placeOrder)
router.post("/deletefromcart", authenticateToken, ArtController.deleteFromCart)
router.post("/deleteItem", authenticateToken, ArtController.deleteItem)


//Reviews Routes
router.post("/addreview", authenticateToken, ArtController.addReview);
router.get("/getartworkreviews/:artworkID",  ArtController.getArtworkReviews);



router.post("/upload", authenticateToken, UploadController.uploadImages);

// File Upload Routes

module.exports = router;
