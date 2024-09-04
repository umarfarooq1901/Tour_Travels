const Tour = require("../../modals/tourModal");
const messageHandler = require("../../utils/messageHandler");
const User = require("../../modals/userModal");

const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");
config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// handler for create tour
const handleCreateTour = async (req, res) => {
  try {
    const _id = req.user;

    const user = await User.findById(_id);

    if (!user) {
      return messageHandler(res, 401, "AdminDashboard", "Admin not Found!");
    }

    const { title, description, price } = req.body;
    const image = req.file.path;

    if (!title || !description || !price || !image) {
      return messageHandler(
        res,
        400,
        "AdminDashboard",
        "All data fields are required!"
      );
    }

    const upload = await cloudinary.uploader.upload(image, {
      folder: "TourTravels",
    });
    if (!upload) {
      return messageHandler(res, 404, "AdminDashboard", "Cloudinary error!");
    }

    const imageUrl = upload.secure_url;

    const newTour = await Tour.create({ title, description, price, imageUrl });
    if (newTour) {
      return messageHandler(
        res,
        201,
        "AdminDashboard",
        "Tour Created Successfully!"
      );
    }
  } catch (error) {
    console.log(error);
    messageHandler(res, 500, "AdminDashboard", "Internal Server Error");
  }
};

// delete tour handler

const handleDeleteTour = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteTour = await Tour.findByIdAndDelete(_id);
    if (!deleteTour) {
      return messageHandler(res, 404, "AdminDashboard", "Tour not found!");
    }
    messageHandler(res, 200, "AdminDashboard", "Tour deleted Successfully!");
  } catch (error) {
    console.log("Error while deleting the Tour Package", error);
    messageHandler(res, 500, "AdminDashboard", "Internal Server Error");
  }
};

// edit tour handler

const handleEditTour = async (req, res) => {
  try {
    const { _id } = req.params;

    const { title, description, price } = req.body;
    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "TourTravles",
    });

    const tourImageUrl = imageUpload.secure_url;

    // Check if the tour exists
    const findTour = await Tour.findById(_id);
    if (!findTour) {
      return messageHandler(res, 404, "AdminDashboard", "Tour not found!");
    }

    // Update the tour and return the updated document
    const editTour = await Tour.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        price,
        tourImageUrl,
      },
      { new: true }
    ); // This option ensures that the updated document is returned after the update operation.

    if (!editTour) {
      return messageHandler(
        res,
        404,
        "AdminDashboard",
        "Failed to update Tour Package. Please try again."
      );
    }

    // messageHandler(res, 200, 'AdminDashboard', 'Tour Package updated successfully!', editTour);
    return res.status(200).render("AdminDashboard", {
      message: "Tour Package updated successfully!",
      editTour,
    });
  } catch (error) {
    console.log("Error while updating the Tour Package", error);
    messageHandler(res, 500, "AdminDashboard", "Internal Server Error");
  }
};

// handler for get all tours
const getAllTours = async (req, res) => {
  try {
    const getTours = await Tour.find();
    if (!getTours || getTours.length === 0) {
      return messageHandler(res, 404, "AdminDashboard", "No Tours Found!");
    }
    return res.status(200).render("AdminDashboard", {
      message: "Tours Retrieved Successfully!",
      Tours: getTours,
    });
  } catch (error) {
    console.log("Error while fetching the the Tour Packages", error);
    messageHandler(res, 500, "AdminDashboard", "Internal Server Error!");
  }
};

// handler for get single Tour

const getTour = async (req, res) => {
  try {
    const { _id } = req.params;
    const tour = await Tour.findById(_id);
    if (!tour) {
      return messageHandler(res, 404, "AdminDashboard", "Tour Not Found");
    }
    // Render the page with the fetched tour details
    return res.status(200).render("AdminDashboard", {
      message: "Tour Fetched Successfully!",
      tour,
    });
  } catch (error) {
    console.log("Error while fetching the Tour!", error);
    return messageHandler(res, 500, "AdminDashboard", "Internal Server Error!");
  }
};

module.exports = {
  handleCreateTour,
  handleDeleteTour,
  handleEditTour,
  getAllTours,
  getTour,
};
