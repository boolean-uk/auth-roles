const express = require("express");
require("express-async-errors");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routers/user");
app.use("/users", userRouter);

const postRouter = require("./routers/post");
app.use("/posts", postRouter);

app.use((err, req, res, next) => {
    console.log("ERROR CONSOLE LOG", err);
    if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            return res.status(409).json({
                error: "A user with the provided username already exists",
            });
        }
        res.status(500).json({ message: "Internal error" });
    }
});

module.exports = app;
