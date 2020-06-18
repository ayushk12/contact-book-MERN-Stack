const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { MongoClient, ObjectID } = require("mongodb");
const assert = require("assert");

app.use(bodyParser.json());

const MongoUrl = "mongodb://localhost:27017";
const database = "ContactList";

MongoClient.connect(MongoUrl, { useNewUrlParser: true }, (err, client) => {
  assert.equal(err, null, "database connection failed");

  const db = client.db(database);

  app.post("/addcontact", (req, res) => {
    let newcontact = req.body;

    db.collection("contactlist").insertOne(newcontact, (err, data) => {
      if (err) res.send("cant add contact");
      else res.send("new contact added");
    });
  });

  app.get("/contactlist", (req, res) => {
    db.collection("contactlist")
      .find()
      .toArray((err, data) => {
        if (err) res.send("cant get contactlist");
        else res.send(data);
      });
  });

  app.delete("/removecontact/:id", (req, res) => {
    let romovedID = ObjectID(req.params.id);

    db.collection("contactlist").findOneAndDelete(
      { _id: romovedID },
      (err, data) => {
        if (err) res.send("cant delete contact");
        else res.send("Contact Deleted");
      }
    );
  });

  app.put("/modifycontact/:id", (req, res) => {
    let modifiedcontact = req.body;
    let modifiedcontactid = ObjectID(req.params.id);

    db.collection("contactlist").update(
      { _id: modifiedcontactid },
      modifiedcontact,
      (err, data) => {
        if (err) res.send("contact cant be modified");
        else res.send("contact modified");
      }
    );
  });
});

app.listen(8000, (err) => {
  if (err) console.log(`connection failed`);
  else console.log(`server is running`);
});
// const express = require("express");

// const port = process.env.PORT || 8000;

// const db = require("./config/mongoose");
// const Contact = require("./model/contact");
// const app = express();

// app.use(express.urlencoded());
// app.use(express.json());

// app.get("/contactlist", function (req, res) {
//   Contact.find({}, function (err, contacts) {
//     if (err) {
//       console.log("error");
//       return;
//     }
//     return res.render("home", {
//       title: "Contact List",
//       contact_list: contacts,
//     });
//   });
// });

// app.post("/addcontact", (req, res) => {
//   Contact.create(req.body, function (err, newContact) {
//     if (err) {
//       console.log("error", err);
//       return;
//     }
//     return res.redirect("back");
//   });
// });

// // for deleting a contact
// app.delete("/removecontact/:id", (req, res) => {
//   // get the id from query in  the url
//   console.log(req.query);
//   let id = req.query.id;

//   //find the contact in the database using id and delete
//   Contact.findByIdAndDelete(id, function (err) {
//     if (err) {
//       console.log("error is deleting an object from databse");
//       return;
//     }
//     return res.redirect("back");
//   });
// });

// app.put("/removecontact/:id", (req, res) => {
//   // get the id from query in  the url

//   let id = req.query.id;

//   //find the contact in the database using id and delete
//   Contact.findByIdAndDelete(id, function (err) {
//     if (err) {
//       console.log("error is updating an object from databse");
//       return;
//     }
//     return res.redirect("back");
//   });
// });

// app.listen(port, function (err) {
//   if (err) {
//     console.log("error running in the server", err);
//   }
//   console.log("my express server running on port ", port);
// });
