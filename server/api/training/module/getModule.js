const Module = require("../../../models/phasesModel");

exports.getModule = async (req, res) => {
  try {
    const phases = await Module.findOne({ _id: req.params.id });
    return res.status(201).json(phases);
  } catch (error) {
    throw error;
  }
};

exports.getModules = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 30;
    const skip = limit * (page - 1);
    const search = req.query.search || "";
    const phasesId = req.params.phasesId || "";
    let searchParams = {};
    if (search) {
      searchParams["title"] = { $regex: search, $options: "i" };
    }
    if (phasesId) {
      searchParams["phasesId"] = phasesId;
    }
    const originalQuery = Module.find(searchParams);
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
