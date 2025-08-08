import Interest from "../models/userInterestModel.js";

export const createInterest = async (req, res, next) => {
  try {

    const { intrestType } = req.body;
    const logoUrl = req.file?.path || req.file?.secure_url;

    if (!intrestType || !logoUrl) {
      return res.status(400).json({
        message: "Missing fields"
      });
    }

    const exists = await Interest.findOne({ intrestType: intrestType.trim() });
    if (exists) {
      return res
        .status(409)
        .json({ message: "Interest with this name already exists" });
    }

    await Interest.create({ intrestType: intrestType.trim(), logoUrl });

    return res.status(201).json({ message: "Interest created" });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error);
  }
};


export const getAllInterests = async (req, res, next) => {
  try {
    const interests = await Interest.find().sort({ createdAt: -1 });
    res.json({ interests });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    next(error);
  }
};
