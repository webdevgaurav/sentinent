const Module = require("../../../models/moduleModel");

exports.getModule = async (req, res) => {
  try {
    const module = await Module.findOne({ _id: req.query.id });
    return res.status(201).json(module);
  } catch (error) {
    throw error.message;
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
    const module = await originalQuery
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(201).json({module, totalCount});
  } catch (error) {
    throw error.message;
  }
};
