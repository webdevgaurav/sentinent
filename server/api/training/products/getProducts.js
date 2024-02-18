const Product = require("../../../models/productModel");

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    return res.status(201).json(product);
  } catch (error) {
    throw error;
  }
};

exports.getProducts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 30;
    const skip = limit * (page - 1);
    const search = req.query.search || "";
    let searchParams = {};
    if (search) {
      searchParams["title"] = { $regex: search, $options: "i" };
    }
    const originalQuery = Product.find(searchParams);
    const clonedQuery = originalQuery.clone();
    const totalCount = await clonedQuery.countDocuments();
    const product = await originalQuery
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(201).json({product, totalCount});
  } catch (error) {
    throw error;
  }
};
