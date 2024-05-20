const UserModel = require("../models/Users");
const mongoose = require("mongoose");

const createArt = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { image, title, size, price, category } = req.body;
    if (!title) {
      return res.status(201).json({ message: "Caption cannot be empty" });
    }

    // Find the user by ID and update the posts array
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          artworks: {
            title,
            size,
            price,
            image,
            category,
            likes: [],
            reviews: [],
          },
        },
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const createAuction = async (req, res) => {
  try {
    const userId = req.userId;
    const { image, title, size, price, category,date,enddate } = req.body;
    if (!title) {
      return res.status(201).json({ message: "Caption cannot be empty" });
    }

    // Find the user by ID and update the posts array
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          auctions: {
            title,
            size,
            price,
            image,
            category,
            date,
            enddate,
            lastone: userId,
          },
        },
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getallAuctions = async (req, res) => {
  try {
    const allAuctions = await UserModel.aggregate([
      { $unwind: "$auctions" }, // Unwind to deconstruct the auctions array
      {
        $lookup: {
          from: "users", // Collection to join
          localField: "auctions.lastone", // Field from auctions array
          foreignField: "_id", // Field from users collection
          as: "lastoneInfo" // Output field containing joined data
        }
      },
      { $unwind: "$lastoneInfo" }, // Unwind to deconstruct the lastoneInfo array
      {
        $project: {
          _id: "$auctions._id", // Auction ID
          title: "$auctions.title",
          category: "$auctions.category",
          image: "$auctions.image",
          size: "$auctions.size",
          price: "$auctions.price",
          date: "$auctions.date",
          enddate: "$auctions.enddate",
          lastone: "$lastoneInfo.username", // Username of the lastone
          lastoneProfileImage: "$lastoneInfo.profileImage", // Profile image of the lastone
          lastoneId: "$lastoneInfo._id" // ID of the lastone
        }
      }
    ]);

    res.status(200).json({ auctions: allAuctions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getArtworkByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const priceRange = req.query.price;
    const searchQuery = req.query.search; // Retrieve search query from query parameters

    let filter = {};

    // If category is "All", fetch all artworks
    if (category === "All") {
      const allArtworks = await UserModel.aggregate([
        { $unwind: "$artworks" }, // Unwind to deconstruct the artworks array
        { $replaceRoot: { newRoot: "$artworks" } }, // Replace root to get artworks as top-level documents
      ]);

      // Filter artworks by price range if specified
      let filteredArtworks = priceRange
        ? allArtworks.filter(
            (artwork) =>
              artwork.price >= parseFloat(priceRange.split("-")[0]) &&
              artwork.price <= parseFloat(priceRange.split("-")[1])
          )
        : allArtworks;

      // Filter artworks by search query if specified
      filteredArtworks = searchQuery
        ? filteredArtworks.filter((artwork) =>
            artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : filteredArtworks;

      res.status(200).json({ artworks: filteredArtworks });
    } else {
      // Find users who have artworks matching the given category
      const usersWithArtworks = await UserModel.find({
        "artworks.category": category,
      });

      // Extract artworks matching the category from users
      let artworks = usersWithArtworks.reduce((accumulator, currentUser) => {
        // Filter artworks of current user that match the category
        const userArtworks = currentUser.artworks.filter(
          (artwork) => artwork.category === category
        );
        // Concatenate current user's artworks to accumulator
        return accumulator.concat(userArtworks);
      }, []);

      // Filter artworks by price range if specified
      let filteredArtworks = priceRange
        ? artworks.filter(
            (artwork) =>
              artwork.price >= parseFloat(priceRange.split("-")[0]) &&
              artwork.price <= parseFloat(priceRange.split("-")[1])
          )
        : artworks;

      // Filter artworks by search query if specified
      filteredArtworks = searchQuery
        ? filteredArtworks.filter((artwork) =>
            artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : filteredArtworks;

      res.status(200).json({ artworks: filteredArtworks });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAuctionByID = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findOne({ "auctions._id": id });

    if (!user) {
      return res.status(404).json({ message: "Auction not found" });
    }

    const auction = user.auctions.find((auction) => auction._id == id);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    const lastoneId = auction.lastone;
    const lastoneUser = await UserModel.findById(lastoneId);

    if (!lastoneUser) {
      return res.status(404).json({ message: "Last one user not found" });
    }

    const lastoneDetails = {
      username: lastoneUser.username,
      profileImage: lastoneUser.profileImage
    };

    const userName = user.username;
    const userID = user._id;
    const allAuctions = user.auctions;

    res.status(200).json({ auction, userName, userID, allAuctions, lastoneDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getArtworkByID = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findOne({ "artworks._id": id });

    if (!user) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    const artwork = user.artworks.find((artwork) => artwork._id == id);

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }
    const userName = user.username;
    const userID = user._id;
    const allArtworks = user.artworks;

    res.status(200).json({ artwork, userName, userID, allArtworks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const addToCart = async (req, res) => {
  try {
    const { UserID, ArtID } = req.body;

    // Find the user by their ID
    const user = await UserModel.findById(UserID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const alreadyExists = user.cart.some((cartItem) => cartItem.equals(ArtID));

    if (alreadyExists) {
      return res
        .status(201)
        .json({ message: "Artwork already exists in the cart" });
    }
    // Push the ArtID to the cart array of the user
    user.cart.push(ArtID);

    // Save the updated user object
    await user.save();

    // Send a success response
    res.status(200).json({ message: "Artwork added to cart successfully" });
  } catch (error) {
    console.error("Error adding artwork to cart", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by userId
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert userIds in the cart to ObjectId
    const cartObjectIds = user.cart.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Retrieve artworks from all users where artwork's ID is in userId's cart
    const artworks = await UserModel.aggregate([
      {
        $unwind: "$artworks",
      },
      {
        $match: { "artworks._id": { $in: cartObjectIds } },
      },
      {
        $project: {
          _id: "$artworks._id",
          title: "$artworks.title",
          category: "$artworks.category",
          image: "$artworks.image",
          size: "$artworks.size",
          price: "$artworks.price",
          reviews: "$artworks.reviews",
          likes: "$artworks.likes",
        },
      },
    ]);

    res.status(200).json(artworks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by userId
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetching artwork details for each item in the orders
    const populatedOrders = await Promise.all(user.orders.map(async order => {
      const populatedItems = await Promise.all(order.items.map(async item => {
        const artwork = await UserModel.findOne({ 'artworks._id': item.itemId }, { 'artworks.$': 1 });
        if (!artwork) {
          return { ...item.toObject(), artwork: null };
        }
        return { ...item.toObject(), artwork: artwork.artworks[0] };
      }));
      return { ...order.toObject(), items: populatedItems };
    }));

    // Return populated orders
    res.status(200).json({ orders: populatedOrders });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteFromCart = async (req, res) => {
  try {
    const { UserId, itemId } = req.body;

    // Find the user by userId
    const user = await UserModel.findById(UserId);
    if (!user) {
      return res.status(201).json({ message: "User not found" });
    }

    // Find the index of the item in the cart array
    const itemIndex = user.cart.findIndex(
      (cartItem) => cartItem.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(201).json({ message: "Item not found in the cart" });
    }

    // Remove the item from the cart array
    user.cart.splice(itemIndex, 1);

    // Save the updated user object
    await user.save();

    // Respond with success message
    return res
      .status(200)
      .json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { formData, cartItems } = req.body;
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Validate formData inputs
    const { name, address, country, city, region, zip, phone, email } =
      formData;
    if (
      !name ||
      !address ||
      !country ||
      !city ||
      !region ||
      !zip ||
      !phone ||
      !email
    ) {
      return res
        .status(201)
        .json({ message: "All fields in formData are required" });
    }
    const newOrder = {
      items: cartItems.map((item) => ({
        itemId: item._id,
        quantity: 1,
        price: item.price,
      })),
      totalAmount: cartItems.reduce((total, item) => total + item.price, 0),
      shippingAddress: formData,
    };

    user.orders.push(newOrder);

    user.cart = [];

    await user.save();

    res
      .status(200)
      .json({
        message:
          "Order placed successfully, We will redirect you to Home page in few seconds.",
        order: newOrder,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const addReview = async (req, res) => {
  try {
    const { artworkID, rating, review } = req.body;
    const userId = req.userId;

    const user = await UserModel.findOne({ "artworks._id": artworkID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the artwork with the given artworkID
    const artwork = user.artworks.find(art => art._id.toString() === artworkID);

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    // Add the review to the artwork
    artwork.reviews.push({
      userId: userId,
      review: review,
      rating: rating
    });

    // Save the user with the updated artwork
    await user.save();

    res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getArtworkReviews = async (req, res) => {
  try {
    const artworkID = req.params.artworkID;

    // Find the user whose artworks include the specified artworkID
    const user = await UserModel.findOne({ 'artworks._id': artworkID });

    if (!user) {
      return res.status(404).json({ message: 'User or artwork not found' });
    }

    // Find the artwork with the specified artworkID
    const artwork = user.artworks.find(art => art._id.toString() === artworkID);

    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    // Extract userIds from reviews
    const userIds = artwork.reviews.map(review => review.userId);

    // Populate users' usernames and profileImages
    const populatedUsers = await UserModel.find({ _id: { $in: userIds } }, 'username profileImage');

    // Map the populated users to a dictionary for easy lookup
    const userDictionary = populatedUsers.reduce((acc, user) => {
      acc[user._id.toString()] = user;
      return acc;
    }, {});

    // Map reviews to include username and profileImage
    const reviews = artwork.reviews.map(review => ({
      username: userDictionary[review.userId.toString()].username,
      profileImage: userDictionary[review.userId.toString()].profileImage,
      review: review.review,
      rating: review.rating,
      updatedAt: review.updatedAt
    }));

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const deleteItem = async (req, res) => {
  try {
    const { artworkId } = req.body;
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const artworkIndex = user.artworks.findIndex(
      (artwork) => artwork._id.toString() === artworkId
    );

    if (artworkIndex === -1) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    user.artworks.splice(artworkIndex, 1);

    await user.save();

    return res.status(200).json({ message: "Artwork deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAuctionPrice = async (req, res) => {
  try {
    const { auctionId, newPrice } = req.body;
    const userId = req.userId;

    const user = await UserModel.findOne({ "auctions._id": auctionId });

    if (!user) {
      return res.status(201).json({ message: "User not found" });
    }

    const auction = user.auctions.find((auction) => auction._id.toString() === auctionId);

    if (!auction) {
      return res.status(201).json({ message: "Auction not found" });
    }

    // Check if the auction has ended
    if (new Date(auction.enddate) < new Date()) {
      return res.status(201).json({ message: "Auction has ended" });
    }

    if (auction.lastone.toString() === userId) {
      return res.status(201).json({ message: "You are already the lastone" });
    }

    if (newPrice <= auction.price) {
      return res.status(201).json({ message: `New price must be greater than ${auction.price}` });
    }

    auction.price = newPrice;
    auction.lastone = userId;

    await user.save();

    return res.status(200).json({ message: "Price updated successfully" });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createAuction,
  createArt,
  getArtworkByCategory,
  getArtworkByID,
  getAuctionByID,
  getallAuctions,
  addToCart,
  getUserCart,
  getUserOrders,
  placeOrder,
  deleteFromCart,
  deleteItem,
  addReview,
  getArtworkReviews,
  updateAuctionPrice
};
