const Phases = require("../../models/phasesModel");

exports.createPhases = async (req, res) => {
  try {
    const { title, creatorId, thumbnail, productId, tags, details } = req.body;
    const newPhases = new Phases({
      productId,
      title,
      creatorId,
      thumbnail,
      tags,
      details,
    });
    const phases = await newPhases.save();
    return res
      .status(201)
      .json({ message: "Phases created successfully", phases });
  } catch (error) {
    return res.status(500).json({ message: "Phases Failed", error: error.message });
  }
};

exports.updatePhases = async (req, res) => {
  try {
    const phasesId = req.params.phasesId;
    const updateData = req.body;
    const updatedPhases = await Phases.findByIdAndUpdate(
      phasesId,
      updateData,
      {
        new: true,
      }
    );
    if (!updatedPhases) {
      return res.status(404).json({ message: "Phases not found" });
    }
    return res.status(200).json(updatedPhases);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
