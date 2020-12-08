module.exports = app => {
    // @ts-ignore
    const items = require("../controllers/item.controller.js");

    // Create a new Item
    app.post("/items", items.create);

    // Retrieve a single Item with itemSlug
    app.get("/items/:itemSlug", items.findOne);

    // Update a Item with itemSlug
    app.put("/items/:itemSlug", items.update);

    // Delete a Item with itemSlug
    app.delete("/items/:itemSlug", items.delete);
};
