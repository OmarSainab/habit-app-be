var express = require("express");
require("dotenv").config();
var mongoose = require("mongoose");
var router = express.Router();
const { getAllHabits } = require('./controllers/habitsRoute')
const { postHabit } = require('./controllers/habitsRoute')
const { patchHabit } = require('./controllers/habitsRoute')
const { deleteHabit } = require('./controllers/habitsRoute')
const { getAllUsers } = require('./controllers/usersRoute')
const { postUser } = require('./controllers/usersRoute')

mongoose.connect(process.env.DATABASE_URL);
const {
  getCompletionByDate,
  completionRes,
  postCompletion,
  patchCompletion,
} = require("./controllers/habitCompletionRoute");
const { getCategories, postCategory } = require("./controllers/categories");
const {
  getUser,
  getAllUsers,
  postUser,
  getUserResponse,
  postUserAuth,
  patchUser,
  deleteUser,
} = require("./controllers/usersRoute");
var completionSchema = require("./models/habit-completion");

var app = express();
app.use(express.json());
app.use(router);

const db = mongoose.connection;

db.on("error", (error: any) => {
  console.error(error);
});

db.once("open", () => {
  console.log("connected to database");
});

router.get("/api/users", getAllUsers);

router.post("/api/users", postUser);

router.get("/api/users/:username", getUser, getUserResponse);

router.post("/api/auth/:username", getUser, postUserAuth);

router.patch("/api/users/:username", getUser, patchUser);

router.delete("/api/users/:username", getUser, deleteUser);

router.get(
  "/api/users/:username/habit_completion/:date",
  getCompletionByDate,
  completionRes
);

router.post("/api/users/:username/habit_completion", getUser, postCompletion);

router.patch("/api/users/:username/habit_completion", getUser, patchCompletion);

router.get("/api/categories/:username", getCategories);

router.post("/api/categories/:username", postCategory);
router.get("/api/users", getAllUsers)

router.post("/api/users", postUser)

router.get("/api/users/:username/habits", 
getAllHabits)

router.post("/api/users/:username/habits", 
postHabit)

router.patch("/api/users/:username/habits/:_id", 
patchHabit)

router.delete("/api/users/:username/habits/:_id", deleteHabit)

const { PORT = 9090 } = process.env;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
