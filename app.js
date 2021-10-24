const express = require("express");
const { sequelize, User, AadharCardDetails, Addresses } = require("./models");

const app = express();
// Use json middleware to make sure body received is in json format
app.use(express.json());

// api to post aadhar details
app.post("/user", async (req, res) => {
  const { full_name, country_code } = req.body;

  try {
    const user = await User.create({ full_name, country_code });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// api to get all users
app.get("/user", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// api to get individual user
app.get("/user/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    // include will include all the posts the user is associated with
    const user = await User.findOne({
      where: { uuid },
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something got wrong" });
  }
});

// api to delete individual user
app.delete("/user/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    // include will include all the posts the user is associated with
    const user = await User.findOne({
      where: { uuid },
    });
    await user.destroy();

    return res.json({ message: "Used deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something got wrong" });
  }
});

// api to update individual user
app.put("/user/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const { full_name, country_code, aadharId } = req.body;
  try {
    // include will include all the posts the user is associated with
    const user = await User.findOne({
      where: { uuid },
    });
    user.full_name = full_name;
    user.country_code = country_code;
    user.aadharId = aadharId;

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something got wrong" });
  }
});

// api to post aadhar details
app.post("/user/:uuid/aadhar", async (req, res) => {
  const uuid = req.params.uuid;
  const { name, aadharNumber } = req.body;
  try {
    const aadhaarDetails = await AadharCardDetails.create({
      name,
      aadharNumber,
    });
    const user = await User.findOne({
      where: { uuid },
    });
    user.aadharId = aadhaarDetails.id;
    await user.save();
    const updatedUser = await User.findOne({
      where: { uuid },
      include: "aadhaarcarddetails",
    });
    return res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// api to get aadhar details of a user
app.get("/user/:uuid/aadhar", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });
    const aadhaarDetails = await AadharCardDetails.findOne({
      where: { id: user.aadharId },
      include: "user",
    });
    return res.json(aadhaarDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// api to post address details for a user
app.post("/user/:uuid/address", async (req, res) => {
  const uuid = req.params.uuid;
  const { name, street, city, country } = req.body;
  try {
    const user = await User.findOne({
      where: { uuid },
    });
    const address = await Addresses.create({
      name,
      street,
      city,
      country,
      userId: user.id,
    });

    return res.json(address);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// api to get address setaild of a user

app.get("/user/:uuid/address", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });
    const address = await Addresses.findAll({
      where: { userId: user.id },
      include: "user",
    });

    return res.json(address);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// creates listener for accepting requests
app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhosT:5000");

  // Creates tables in database based on models we have
  // Will drop database everytime the app runs. So we need to change this. Hence commented
  // await sequelize.sync({ force: true });

  // This will just connect to database
  await sequelize.authenticate();
  console.log("Databse Connected");
});
