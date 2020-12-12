const sql = require("./db.js");

// constructor
const Item = function(item) {
    this.slug = item.slug;
    this.name = item.name;
    this.phrase = item.phrase;
    this.website = item.website;
    this.phone = item.phone;
    this.location = item.location;
    this.lat = item.lat;
    this.lng = item.lng;
    this.image = item.image;
    this.category = item.category;
    this.history = item.history;
    this.entertainment = item.entertainment;
    this.art = item.art;
    this.nature = item.nature;
    this.relaxation = item.relaxation;
    this.shopping = item.shopping;
    this.cuisine = item.cuisine;
    this.destinationSlug = item.destinationSlug;
};

Item.create = (newItem, result) => {
    sql.query("INSERT INTO Items SET ?", newItem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created item: ", { slug: result.insertSlug, ...newItem });
        result(null, { slug: res.insertSlug, ...newItem });
    });
};

Item.findBySlug = (slug, result) => {
    console.log({slug});
    sql.query(`SELECT * FROM Items WHERE slug = "${slug}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found item: ", res[0]);
            result(null, res[0]);
            return;
        }

        // Item not found by Slug
        result({ kinds: "not_found" }, null);
    });
};

Item.getAllForDestination = (destinationSlug, result) => {
    sql.query("SELECT * FROM Items WHERE destinationSlug = ?", [destinationSlug], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Items: ", res);
        result(null, res);
    });
};

Item.updateBySlug = (slug, item, result) => {
    sql.query(
        `UPDATE Items SET name = ?, phrase = ?, website = ?, phone = ?, location = ?, lat = ?, lng = ?,
        image = ?, category = ?, history = ?, entertainment = ?, art = ?, nature = ?,
        relaxation = ?, shopping = ?, cuisine = ?, destinationSlug = ? WHERE slug = ?`,
        [item.name, item.phrase, item.website, item.phone, item.location, item.lat, item.lng,
        item.image, item.category, item.history, item.entertainment, item.art, item.nature,
        item.relaxation, item.shopping, item.cuisine, item.destinationSlug, slug],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // Item not found by slug
                result({ kinds: "not_found" }, null);
                return;
            }

            console.log("updated item: ", { slug: slug, ...item });
            result(null, { slug: slug, ...item });
        }
    );
};

Item.remove = (slug, result) => {
    sql.query("DELETE FROM Items WHERE slug = ?", slug, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // Item not found by slug
            result({ kinds: "not_found" }, null);
            return;
        }

        console.log("deleted item with slug: ", slug);
        result(null, res);
    });
};

module.exports = Item;
