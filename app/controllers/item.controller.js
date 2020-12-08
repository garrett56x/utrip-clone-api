const Item = require("../models/item.model.js");

// Create & Save a new Item
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!",
        });
    }

    // Create a Item
    const item = new Item({
        slug: req.body.slug,
        name: req.body.name,
        phrase: req.body.phrase,
        website: req.body.website,
        phone: req.body.phone,
        location: req.body.location,
        lat: req.body.lat,
        lng: req.body.lng,
        image: req.body.image,
        category: req.body.category,
        history: req.body.history,
        entertainment: req.body.entertainment,
        art: req.body.art,
        nature: req.body.nature,
        relaxation: req.body.relaxation,
        shopping: req.body.shopping,
        cuisine: req.body.cuisine,
        destinationSlug: req.body.destinationSlug,
    });

    // Save Item in the database
    Item.create(item, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occured while creating the Item.",
            });
        } else {
            res.send(data);
        }
    });
};

// Find a single Item with a itemSlug
exports.findOne = (req, res) => {
    Item.findBySlug(req.params.itemSlug, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Item with slug ${req.params.itemSlug} not found.`,
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Item with slug ${req.params.itemSlug}`,
                });
            }
        } else {
            res.send(data);
        }
    });
};

// Update a Item identified by the itemSlug in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!",
        });
    }

    Item.updateBySlug(
        req.params.itemSlug,
        new Item(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Item with slug ${req.params.itemSlug} not found.`,
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating Item with slug ${req.params.itemSlug}`,
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

// Delete a Item with the specified itemSlug in the request
exports.delete = (req, res) => {
    Item.remove(req.params.itemSlug, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Item with slug ${req.params.itemSlug} not found.`,
                });
            } else {
                res.status(500).send({
                    message: `Could not delete Item with slug ${req.params.itemSlug}`,
                });
            }
        } else {
            res.send({ message: "Item was deleted successfully!" });
        }
    });
};
