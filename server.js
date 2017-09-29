const express = require("express");;
const expressValidator = require("express-validator");
const session = require("express-session");
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const sessionConfig = require("./sessionConfig")
const port = process.env.PORT || 8088;
const models = require("./models");
const indexRouter = require('./routes/indexRoutes');
const signupRouter = require('./routes/signupRoutes');
const loginRouter = require('./routes/loginRoutes');
const logoutRouter = require('./routes/logoutRoutes');
const postsRouter = require('./routes/postsRoutes');
const likesRouter = require('./routes/likesRoutes');
const mypostsRouter = require('./routes/mypostsRoutes');
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache")

app.use(express.static('public'));
app.use(express.static("views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(session(sessionConfig));

app.use('/home', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/posts', postsRouter);
app.use('/likes', likesRouter);
app.use('/myposts', mypostsRouter);
app.use('/', indexRouter);

app.listen(port, function () {
    console.log('Server is running on port: ', port);
});
