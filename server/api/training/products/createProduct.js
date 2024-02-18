const Product = require("../../../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { title, creatorId, thumbnail, price, tags, details } = req.body;
    const newProduct = new Product({
      title,
      creatorId,
      thumbnail,
      price,
      tags,
      details,
    });
    const product = await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    return res.status(500).json({ message: "Product Failed", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const updateData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
