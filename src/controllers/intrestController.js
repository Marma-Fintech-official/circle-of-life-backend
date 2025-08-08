import Interest from "../models/userInterestModel.js";

const getFileUrl = (file) => {
  if (!file) return null;
  // common properties returned by different cloudinary/multer integrations
  return file.path || file.location || file.secure_url || file.url || null;
};

export const createInterest = async (req, res, next) => {
  try {
    const { intrestType } = req.body;
    const file = req.file;

    if (!intrestType) {
      return res.status(400).json({ message: "Interest type is required." });
    }
    if (!file) {
      return res
        .status(400)
        .json({ message: "Logo image is required (form-data field 'logo')." });
    }

    const logoUrl = getFileUrl(file);
    if (!logoUrl) {
      return res
        .status(500)
        .json({ message: "Uploaded but couldn't read file URL." });
    }

    // optional: avoid duplicates by name
    const existing = await Interest.findOne({
      intrestType: intrestType.trim(),
    });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Interest with this name already exists." });
    }

    const interest = new Interest({ intrestType: intrestType.trim(), logoUrl });
    await interest.save();

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


