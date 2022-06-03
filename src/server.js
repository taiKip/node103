const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require('./config/corsOptions')
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const employeesRouter = require('./routes/employees.router')
const PORT = process.env.PORT || 3500;
//middleware

//custom middleware logger
app.use(logger);
//Cross Origin resource sharing

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//routes
app.use('/api/v1/employees',employeesRouter)

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
