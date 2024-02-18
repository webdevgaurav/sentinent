const Phases = require("../../../models/phasesModel");

exports.getPhase = async (req, res) => {
  try {
    const phases = await Phases.findOne({ _id: req.params.id });
    return res.status(201).json(phases);
  } catch (error) {
    throw error;
  }
};

exports.getPhases = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 30;
    const skip = limit * (page - 1);
    const search = req.query.search || "";
    const productId = req.params.productId || "";
    let searchParams = {};
    if (search) {
      searchParams["title"] = { $regex: search, $options: "i" };
    }
    if (productId) {
      searchParams["productId"] = productId;
    }
    const originalQuery = Phases.find(searchParams);
    const clonedQuery = originalQuery.clone();
    const totalCount = await clonedQuery.countDocuments();
    const phases = await originalQuery
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(201).json({phases, totalCount});
  } catch (error) {
    throw error;
  }
};
