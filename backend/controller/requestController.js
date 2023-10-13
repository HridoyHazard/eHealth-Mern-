import asyncHandler from "../middleware/asyncHandler.js";
import RequestBlood from "../models/requestModel.js";

// @desc    Create new request
// @route   POST /api/requestdonor
// @access  Private

const addRequestDonor = asyncHandler(async (req, res) => {
  const { requestItems } = req.body;

  if (requestItems && requestItems === 0) {
    res.status(400);
    throw new Error("No Donor items");
  } else {
    const request = new RequestBlood({
      requestItems: requestItems.map((x) => ({
        ...x,
      })),
      user: req.user._id,
    });
    const createdRequest = await request.save();
    res.status(201).json(createdRequest);
  }
  res.send("add Request Blood");
});

// @desc    Get logged in user requests
// @route   GET /api/requests/mine
// @access  Private
const getMyRequests = asyncHandler(async (req, res) => {
  const requests = await RequestBlood.find({ user: req.user._id });
  res.status(200).json(requests);
  res.send("get my requests");
});

// @desc    Get request by ID
// @route   GET /api/requests/:id
// @access  Private
const getRequestById = asyncHandler(async (req, res) => {
  const request = await RequestBlood.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (request) {
    res.status(200).json(request);
  } else {
    res.status(404);
    throw new Error("Request not found");
  }
  res.send("get request by id");
});

// @desc    Update appointment to approved
// @route   GET /api/requests/:id/approve
// @access  Private/Admin
const updateRequestToApproved = asyncHandler(async (req, res) => {
  const request = await RequestBlood.findById(req.params.id);

  if (request) {
    request.isApproved = true;
    request.ApprovedAt = Date.now();

    const updatedRequest = await request.save();

    res.json(updatedRequest);
  } else {
    res.status(404);
    throw new Error("Request not found");
  }
  res.send("update request to approved");
});

// @desc    Get all appointments
// @route   GET /api/requests
// @access  Private/Admin
const getRequests = asyncHandler(async (req, res) => {
  const requests = await RequestBlood.find({}).populate("user", "id name");
  res.json(requests);
  res.send("get requests");
});

export {
  addRequestDonor,
  getMyRequests,
  getRequestById,
  getRequests,
  updateRequestToApproved,
};
