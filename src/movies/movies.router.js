const router = require("express").Router({mergeParams: true}); 
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed"); 

router.route("/")
 .get(controller.list)
 .all(methodNotAllowed)

router.route("/:movieId([0-9]+)")
 .get(controller.read)
 .all(methodNotAllowed);

router.route("/:movieId/theaters")
 .get(controller.theatersList)
 .all(methodNotAllowed)

router.route("/:movieId/reviews")
 .get(controller.reviewsList)
 .all(methodNotAllowed)

 module.exports = router;