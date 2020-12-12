const sql = require("./db.js");

// constructor
const Destination = function(destination) {
    this.slug = destination.slug;
    this.city = destination.city;
    this.state = destination.state;
    this.country = destination.country;
    this.image = destination.image;
};

Destination.create = (newDestination, result) => {
    sql.query("INSERT INTO Destinations SET ?", newDestination, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created destination: ", { slug: result.insertSlug, ...newDestination });
        result(null, { slug: res.insertSlug, ...newDestination });
    });
};

Destination.findBySlug = (slug, result) => {
    console.log({slug});
    sql.query(`SELECT * FROM Destinations WHERE slug = "${slug}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found destination: ", res[0]);
            result(null, res[0]);
            return;
        }

        // Destination not found by Slug
        result({ kinds: "not_found" }, null);
    });
};

Destination.getAll = result => {
    sql.query("SELECT * FROM Destinations ORDER BY id ASC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Destinations: ", res);
        result(null, res);
    });
};

Destination.updateBySlug = (slug, destination, result) => {
    sql.query(
        "UPDATE Destinations SET city = ?, state = ?, country = ?, image = ? WHERE slug = ?",
        [destination.city, destination.state, destination.country, destination.image, slug],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // Destination not found by slug
                result({ kinds: "not_found" }, null);
                return;
            }

            console.log("updated destination: ", { slug: slug, ...destination });
            result(null, { slug: slug, ...destination });
        }
    );
};

Destination.remove = (slug, result) => {
    sql.query("DELETE FROM Destinations WHERE slug = ?", slug, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // Destination not found by slug
            result({ kinds: "not_found" }, null);
            return;
        }

        console.log("deleted destination with slug: ", slug);
        result(null, res);
    });
};

module.exports = Destination;
