const {
  handleGetJewelry,
  handleGetJewelryByFilters,
} = require("../controllers/getJewelry.controller");
const { handleErrors } = require("../controllers/handleErrors.controller");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  try {
    await handleGetJewelry(req, res);
  } catch (error) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

router.get("/filtros", async (req, res) => {
  try {
    await handleGetJewelryByFilters(req, res);
  } catch (error) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

module.exports = router;
