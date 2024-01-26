const SearchActivityModel = require("../model/searchActivity.model");
const { baseManager } = require("../modelManager/baseModel.manager");
const axios = require("axios");

const searchActivityManager = new baseManager(SearchActivityModel);

module.exports.postSearchActivity = async (req, res) => {
  try {
    const body = req.body;
    let searchResult;
    console.log(body);
    await axios
      .post(process.env.model_url, body)
      .then((response) => {
        searchResult = response.data;
        console.log(searchResult);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    let dataObject = {
      searchTitle: body.gadget,
      searchResult: searchResult,
      createdByUser: req.user.id,
    };
    const searchActivity = await searchActivityManager.create(dataObject);
    return res.json({
      message: "searchActivity created successfully",
      searchActivity,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.deleteAllSearchActivity = async (req, res) => {
  const userId = req.user.id;
  try {
    const searchActivity = await searchActivityManager.findOne({
      createdByUser: userId,
    });
    if (searchActivity.length == 0) {
      return res.status(404).json({ message: "No searchActivity found" });
    }
    const deletedRecord = await searchActivityManager.deleteMany({
      createdByUser: userId,
    });
    return res.json({
      message: "searchActivity deleted successfully",
      deletedRecord,
    });
  } catch (error) {
    return res.json({ message: "Error deleting searchActivity", error });
  }
};

module.exports.getSearchActivityPaginated = async (req, res) => {
  const userId = req.user.id;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  try {
    const searchActivity = await searchActivityManager.findOne({
      createdByUser: userId,
    });
    if (searchActivity.length == 0) {
      return res.status(404).json({ message: "No searchActivity found" });
    }
    const paginatedSearchActivity =
      await searchActivityManager.findPaginatedRecords(
        { createdByUser: userId },
        skip,
        limit
      );
    return res.json({
      message: "searchActivity fetched successfully",
      paginatedSearchActivity,
    });
  } catch (error) {
    return res.json({ message: "Error fetching searchActivity", error });
  }
};

module.exports.deleteSearchActivityById = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const searchActivity = await searchActivityManager.findOne({ _id: id });
    if (searchActivity.createdByUser != userId) {
      return res.status(404).json({ message: "Resource access denied" });
    }
    const deletedRecord = await searchActivityManager.deleteById(id);
    return res.json({
      message: "searchActivity deleted successfully",
      deletedRecord,
    });
  } catch (error) {
    return res.json({ message: "Error deleting searchActivity", error });
  }
};
