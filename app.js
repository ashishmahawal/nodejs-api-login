const express = require("express");
const bodyParser = require("body-parser");
const utils = require("./utils/utils");
const userUtil = require('./utils/user')
const middleware = require('./middleware');

app = express();
const port = 9000;


// Insert all middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.loggerMiddleware);
app.use("/login", middleware.authenticateUser);

app.get("/", (req, res) => {
  res.send(utils.generateHash("test"));
});


app.get("/success", (req, res) => {
        res.send("Successfull Login , ***** RESTRICTED ZONE *****");
  
});

app.post("/login", (req, res) => {
  console.log("Login success");
  res.redirect('success');
  //res.send("Login success ");
});

app.post("/create", (req, res) => {
    let u = req.body.username
    let p = utils.generateHash(req.body.password)
    let response = userUtil.createUser(u,p)
    res.status(201).send(response)
  });


// Start the application server
app.listen(port, () => {
  console.log(`Started backend web server on port : ${port}`);
});
