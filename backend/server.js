const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());
// let database_url =
//   "mongodb+srv://saad1325:mathematic1325@cluster0.fbrpd.mongodb.net/test";

let database_url = "mongodb://localhost:27017";
mongoose.connect(database_url);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("database connected");
});

const product_schema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
    // required: true,
  },
  quantity: {
    type: String,
  },
  price: {
    type: String,
  },
});

const Product = mongoose.model("products", product_schema);

app.get("/getProducts", async (req, res) => {
  let products = await Product.find();
  // console.log(products);
  res.json({ products: products });
});

app.post("/addProduct", (req, res) => {
  // console.log(req.body);
  const product = new Product(req.body);

  product.save((error) => {
    if (error) {
      console.log(error);
    }
    res.send(product);
  });
});

app.delete("/deleteProduct/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, suc) => {
    if (err) {
      res.send(err);
    } else {
      res.send(suc);
    }
  });
});

app.listen(3000, () => {
  console.log("server started ");
});
