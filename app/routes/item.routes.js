module.exports = app => {
    const items = require("../controllers/item.controller.js");

    // Create a new Item
    app.post("/items", items.create);

    // Retrieve all items for a single Destination
    app.get("/items", items.findAllForDestination);

    // Retrieve a single Item with itemSlug
    app.get("/items/:itemSlug", items.findOne);

    // Update a Item with itemSlug
    app.put("/items/:itemSlug", items.update);

    // Delete a Item with itemSlug
    app.delete("/items/:itemSlug", items.delete);
};
