const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require('./config/corsOptions')
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const employeesRouter = require('./routes/employees.router')
const registerRouter = require('./routes/register.router')
const authRouter = require('./routes/auth.router')
const refreshRouter = require('./routes/refresh.router')
const logoutRouter = require('./routes/logout.router')
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const PORT = process.env.PORT || 3500;
//middleware

//custom middleware logger
app.use(logger);
//handle optopons credentials check -before CORS!
//and fech cookies credentials requirement
app.use(credentials);
//Cross Origin resource sharing

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
//built in middleware for json
app.use(express.json());

//built in middleware for cookies
app.use(cookieParser());
//routes

app.use('/api/v1/register', registerRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/refresh', refreshRouter)
app.use('/api/v1/logout', logoutRouter)

app.use(verifyJWT);
app.use("/api/v1/employees", employeesRouter);
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.send('<h1>Something went wrong<h1>')
    }
    else if (req.accepts('json')) {
        res.json({error:"404 Not found"})
    } else {
        res.type('txt').send('404 Not found')
    }
})
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
