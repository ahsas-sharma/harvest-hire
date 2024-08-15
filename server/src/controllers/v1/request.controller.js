import { asyncHandler } from "../../utils/asyncHandler.js";
import Request from "../../models/request.model.js";
import Order from "../../models/order.model.js";

export const getAllRequests = asyncHandler(async (req, res) => {
  try {
    const status = req.query.status;
    let query = {};
    if (status) {
      query.status = status;
    }

    let requests = await Request.find(query)
      .populate("equipmentId")
      .populate("userId", "name");
    if (!requests) {
      return res.status(404).send("Requests not found");
    } else {
      return res.status(200).send(requests);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export const getRequestsForUser = asyncHandler(async (req, res) => {
  let userId = req.payload.userId;

  try {
    let userRequests = await Request.find({ userId: userId }).populate(
      "equipmentId"
    );

    if (!userRequests) {
      return res
        .status(404)
        .json({ message: "No requests found for the user" });
    } else {
      return res.status(200).send(userRequests);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export const getRequestById = asyncHandler(async (req, res) => {
  try {
    let requestData = await Request.findById(req.params.requestId);
    if (!requestData) {
      return res.status(404).json({ message: "Request not found" });
    } else {
      return res.status(200).send(requestData);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export const createRequest = asyncHandler(async (req, res) => {
  let { equipmentId, startDate, endDate, totalDays, totalPrice } = req.body;
  let userId = req.payload.userId;
  let requestData = {
    equipmentId,
    userId,
    startDate,
    endDate,
    totalDays,
    totalPrice,
  };

  try {
    // check for duplication
    let requestExists = await checkRequestExists(
      equipmentId,
      userId,
      startDate,
      endDate
    );

    if (requestExists) {
      res
        .status(409)
        .send("An existing request already exists with the same details");
    } else {
      let request = await Request.create(requestData);
      res.status(200).json(request);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export const submitRequest = asyncHandler(async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "InCart") {
      return res
        .status(400)
        .json({ message: "Request status must be 'InCart' to submit" });
    }

    request.status = "Requested";
    await request.save();

    res.status(200).json({ message: "Request submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export const updateRequest = asyncHandler(async (req, res) => {
  try {
    let requestToUpdate = await Request.findById({ _id: req.params.requestId });

    if (!requestToUpdate) {
      return res.status(404).send({
        message: "Request does not exist.",
      });
    }

    // check status before allowing user to update
    if (
      requestToUpdate.status == "InCart" ||
      requestToUpdate.status == "Requested"
    ) {
      Object.keys(req.body).forEach((key) => {
        if (key in requestToUpdate) {
          requestToUpdate[key] = req.body[key];
        }
      });

      await requestToUpdate.save();
      res.status(200).json({ message: "Request updated successfully" });
    } else {
      return res.status(422).send({
        message: "Cannot update request as it has already been processed.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export const deleteRequest = asyncHandler(async (req, res) => {
  try {
    let requestToDelete = await Request.findById({ _id: req.params.requestId });
    console.log("Found request to delete");

    if (!requestToDelete) {
      return res.status(404).send({
        message: "Request does not exist.",
      });
    }

    // user should NOT be able to delete request after it's status has been updated to accepted, rejected, returned or overdue
    if (
      requestToDelete.status == "InCart" ||
      requestToDelete.status == "Requested"
    ) {
      await requestToDelete.deleteOne();
      // await Request.deleteOne({ _id: req.params.requestId });
      res.status(200).json({ message: "Item deleted" });
    } else {
      res
        .status(401)
        .json({ message: "Cannot delete request after it has been submitted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ------------- ADMIN ------------ //

export const getPendingRequests = asyncHandler(async (req, res) => {
  console.log(`In Get Pending`);
  try {
    const requests = await Request.find({ status: "Requested" });
    res.status(200).send(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// accept a request as admin
export const acceptRequest = asyncHandler(async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "Requested") {
      return res.status(400).json({
        message: `Request cannot be accepted as its current status is : ${request.status}`,
      });
    }

    request.status = "Accepted";
    await request.save();

    let orderData = {
      userId: request.userId,
      equipmentId: request.equipmentId,
      rentDate: request.startDate,
      returnDate: request.endDate,
      totalDays: request.totalDays,
      totalPrice: request.totalPrice,
    };
    let order = await Order.create(orderData);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// reject a request as admin
export const rejectRequest = asyncHandler(async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "Requested") {
      return res.status(400).json({
        message: `Request cannot be rejected as its current status is : ${request.status}`,
      });
    }

    request.status = "Rejected";
    let updatedRequest = await request.save();
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// reject a request as admin
export const markAsReturned = asyncHandler(async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status == "Accepted" || request.status == "Overdue") {
      console.log(request);
      request.status = "Returned";
      let updatedRequest = await request.save();
      console.log(updatedRequest);
      res.status(200).send(updatedRequest);
    } else {
      return res
        .status(400)
        .send(
          `Request cannot be marked as Returned as its current status is : ${request.status}`
        );
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// util function to check if a request already exists
async function checkRequestExists(equipmentId, userId, startDate, endDate) {
  try {
    const existingRequest = await Request.findOne({
      equipmentId: equipmentId,
      userId: userId,
      startDate: startDate,
      endDate: endDate,
    });

    if (existingRequest) {
      console.log("A request with the specified parameters already exists.");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

// export const updateRequestStatusHandler = (status) =>
//   asyncHandler(async (req, res) => {
//     res.status(200).send(`Need to update the request status to ${status}`);
//     try {
//       const request = await Request.findById(req.params.requestId);
//     } catch (error) {}
//   });
