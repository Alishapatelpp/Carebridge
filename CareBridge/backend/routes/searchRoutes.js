const express = require("express");

const router = express.Router();

const {
  searchMedicine,
} = require(
  "../controllers/searchController"
);

router.get("/", searchMedicine);

module.exports = router;