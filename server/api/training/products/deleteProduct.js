const Product = require("../../../models/productModel");
const Phases = require("../../../models/phasesModel");
const Module = require("../../../models/moduleModel");

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    const phases = await Phases.deleteMany({ productId: req.params.productId });
    const module = await Module.deleteMany({ productId: req.params.productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res
      .status(201)
      .json({ message: "Product deleted successfully", product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
