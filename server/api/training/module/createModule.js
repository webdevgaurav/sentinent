const Module = require("../../../models/moduleModel");

exports.createModule = async (req, res) => {
  try {
    const { title, creatorId, thumbnail, phasesId, productId, tags, details, content, rating } =
      req.body;
    const newModule = new Module({
      productId,
      phasesId,
      creatorId,
      title,
      thumbnail,
      tags,
      rating,
      content,
      details,
    });
    const module = await newModule.save();
    return res
      .status(201)
      .json({ message: "Module created successfully", module });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Module Failed", error: error.message });
  }
};

exports.updateModule = async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const updateData = req.body;
    const updatedModule = await Module.findByIdAndUpdate(moduleId, updateData, {
      new: true,
    });
    if (!updatedModule) {
      return res.status(404).json({ message: "Module not found" });
    }
    return res.status(200).json(updatedModule);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
