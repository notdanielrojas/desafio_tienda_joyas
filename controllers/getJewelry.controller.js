const {
  getJewelry,
  getJewelryByFilters,
  getHATEOAS,
} = require("../models/getJewelry.model");
const { handleErrors } = require("./handleErrors.controller");

const handleGetJewelry = async (req, res) => {
  try {
    const queryStrings = req.query;
    const jewelry = await getJewelry(queryStrings);
    const HATEOAS = getHATEOAS(jewelry);
    res.json(HATEOAS);
  } catch (error) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
};

const handleGetJewelryByFilters = async (req, res) => {
  try {
    const queryStrings = req.query;
    const jewelry = await getJewelryByFilters(queryStrings);
    res.json(jewelry);
  } catch (error) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
};

module.exports = { handleGetJewelry, handleGetJewelryByFilters };
