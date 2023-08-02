const {
    express,
    bodyParser,
    utils,
    userUtil,
    middleware,
    auth,
    swaggerUi,
    swaggerFile,
    cors
} = require('./app_requires')


app = express();
const port = 9000;
// Makes our resources available to anyone ,not just the same origin
app.use(cors({
    origin: '*'
}));

// Insert all middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.loggerMiddleware);
app.use("/login", middleware.authenticateUser);
app.use('/user/*',middleware.validateToken);

// Swagger UI
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get("/", (req, res) => {
  res.send(utils.generateHash("test"));
});


app.get("/user/data", (req, res) => {
        userId = req.body.user
        res.send({userId})
});

app.post("/login", (req, res) => {
  console.log("Login success");
  const token = auth.generateToken(req.body.username)
  res.send({token});
  //res.redirect('success');
  
});

app.post("/create", (req, res) => {
    let u = req.body.username
    let p = utils.generateHash(req.body.password)
    let userCreated = userUtil.createUser(u,p)
    userCreated ? res.status(201).send("User Created"):res.status(409).send("Failure,User Exists,Try different userId")
    
  });

// Start the application server
app.listen(port, () => {
  console.log(`Started backend web server on port : ${port}`);
});
