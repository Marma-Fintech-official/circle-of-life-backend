import Interest from "../models/userInterestModel.js";

export const createInterest = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    const { intrestType } = req.body;
    const logoUrl = req.file?.path || req.file?.secure_url;

    if (!intrestType || !logoUrl) {
      return res.status(400).json({
        message: !intrestType
          ? "Interest type is required."
          : "Logo image is required (form-data field 'logo').",
      });
    }

    const exists = await Interest.findOne({ intrestType: intrestType.trim() });
    if (exists) {
      return res
        .status(409)
        .json({ message: "Interest with this name already exists." });
    }

    await Interest.create({ intrestType: intrestType.trim(), logoUrl });

    return res.status(201).json({ message: "Interest created" });
  } catch (err) {
    next(err);
  }
};


export const getAllInterests = async (req, res, next) => {
  try {
    const interests = await Interest.find().sort({ createdAt: -1 });
    res.json({ interests });
  } catch (err) {
    next(err);
  }
};
