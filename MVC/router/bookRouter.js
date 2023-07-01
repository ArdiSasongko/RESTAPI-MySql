const express = require("express")
const router = new express.Router()
const book = require("../controller/bookController")

router.get("/", book.getBooks)
router.get("/:id", book.getBook)
router.post("/", book.insertBook)
router.put("/:id", book.updateBook)
router.delete("/:id", book.deleteBook)

module.exports = router