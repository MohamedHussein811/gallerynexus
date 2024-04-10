const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  gender: { type: String },
  age: { type: Number },
  profileImage: { type: String, default: "/assets/Profile/Profile.jpg" },
  bio: { type: String, default: "" },
  isArtist: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  artworks: [
    {
      title: { type: String },
      category: { type: String },
      image: [{ type: String, default: "" }],
      size: { type: String },
      price: { type: Number },
      reviews: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
          review: { type: String,default:""},
          rating: {type: Number, default: 1},
          updatedAt: { type: Date, default: Date.now },
        },
      ],
      likes: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        },
      ],
    },
  ],
  auctions: [
    {
      lastone: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      title: { type: String },
      category: { type: String },
      image: [{ type: String, default: "" }],
      size: { type: String },
      price: { type: Number },
      date: { type: Date },
      enddate: { type: Date },
    },
  ],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  orders: [
    {
      items: [
        {
          itemId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
          quantity: { type: Number, default: 1 },
          price: { type: Number },
        },
      ],
      totalAmount: { type: Number },
      shippingAddress: {
        name: { type: String },
        address: { type: String },
        country: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        phone: { type: String },
        email: { type: String },
      },
      orderStatus: { type: String, default: "Recently Ordered" },

      createdAt: { type: Date, default: Date.now },
    },
  ],
  activation_code: { type: Number },
  isActivated: { type: Boolean, default: false },
  access_token: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
