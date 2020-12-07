module.exports = app => {
    const destinations = require("../controllers/destination.controller.js");

    // Create a new Destination
    app.post("/destinations", destinations.create);

    // Retrieve all destinations
    app.get("/destinations", destinations.findAll);

    // Retrieve a single Destination with destinationSlug
    app.get("/destinations/:destinationSlug", destinations.findOne);

    // Update a Destination with destinationSlug
    app.put("/destinations/:destinationSlug", destinations.update);

    // Delete a Destination with destinationSlug
    app.delete("/destinations/:destinationSlug", destinations.delete);
};
