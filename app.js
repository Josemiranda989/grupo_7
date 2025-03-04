var createError = require("http-errors");
var express = require("express");
var path = require("path");
var indexRouter = require("./routes/index.routes");
var productsRouter = require("./routes/products.routes");
var usersRouter = require("./routes/users.routes");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var methodOverride = require("method-override");
var session = require("express-session");
var app = express();
var userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

/* MIDDLEWARES*/
app.use(
  session({
    secret: "Esto es un secreto wow",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(userLoggedMiddleware)

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* RUTAS DE INDEX */
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/products", productsRouter);

// catch 404 and forward to error handler
/* app.use(function (req, res, next) {
  next(createError(404));
});  */

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;