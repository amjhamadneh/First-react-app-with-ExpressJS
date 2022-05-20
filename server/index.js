const express = require('express')
const app = express()
const cors = require('cors')
const postRouter = require('./routes/Posts')
const userRouter = require('./routes/Users')

app.use(express.json());
app.use(cors());
app.use("/posts", postRouter)
app.use("/users", userRouter)

app.get("/", (req, res) => {
    res.send("Welcome");
});

const db = require('./models')
const port = process.env.PORT || 8000;
db.sequelize.sync().then(() => {
    app.listen(port);
})
