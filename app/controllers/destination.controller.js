const Destination = require("../models/destination.model.js");
const Item = require("../models/item.model.js");

// Create & Save a new Destination
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!",
        });
    }

    // Create a Destination
    const destination = new Destination({
        slug: req.body.slug,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        image: req.body.image,
    });

    // Save Destination in the database
    Destination.create(destination, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occured while creating the Destination.",
            });
        } else {
            res.send(data);
        }
    });
};

// Retrieve all Destinations from the database.
exports.findAll = (req, res) => {
    Destination.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occured while retrieving destinations.",
            });
        } else {
            res.send(data);
        }
    });
};

// Find a single Destination with a destinationSlug
exports.findOne = (req, res) => {
    Destination.findBySlug(req.params.destinationSlug, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Destination with slug ${req.params.destinationSlug} not found.`,
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Destination with slug ${req.params.destinationSlug}`,
                });
            }
        } else {
            res.send(data);
        }
    });
};

// Update a Destination identified by the destinationSlug in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!",
        });
    }

    Destination.updateBySlug(
        req.params.destinationSlug,
        new Destination(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Destination with slug ${req.params.destinationSlug} not found.`,
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating Destination with slug ${req.params.destinationSlug}`,
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

// Delete a Destination with the specified destinationSlug in the request
exports.delete = (req, res) => {
    Destination.remove(req.params.destinationSlug, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Destination with slug ${req.params.destinationSlug} not found.`,
                });
            } else {
                res.status(500).send({
                    message: `Could not delete Destination with slug ${req.params.destinationSlug}`,
                });
            }
        } else {
            res.send({ message: "Destination was deleted successfully!" });
        }
    });
};

// Retrieve all Items for a single destination from the database.
exports.findAllItemsForDestination = (req, res) => {
    Item.getAllForDestination(req.params.destinationSlug, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occured while retrieving items.",
            });
        } else {
            res.send(data);
        }
    });
};
