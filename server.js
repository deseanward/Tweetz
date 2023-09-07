// Setup Express
const express = require("express");
require("dotenv").config();
const connectDB = require("./utils/connectDB");
const Tweet = require("./models/tweet");
const manyTweets = require("./models/many-tweets");
const jsxEngine = require("jsx-view-engine");
const methodOverride = require("method-override");

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// ***** App Config ***** //
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());
app.use(methodOverride("_method"));

// ***** Middleware ***** //
// Encode and Parse JSON Data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"))

// ****** VIEWS ROUTES ***** //
/**
 * Root
 */
app.get("/", (req, res) => {
  res.send('<h1>Welcome to Tweetz!</h1>');
});

/**
 * Index
 */
app.get("/tweets", async (req, res) => {
  try {
    const tweets = await Tweet.find({}).sort({
      updatedAt: -1,
    });
    res.render("Index", {
      tweets: tweets,
    });
  } catch (error) {
    console.log("An error occured fetching the tweets: ", error);
  }
});

/**
 * New
 */
app.get("/tweets/new", (req, res) => {
  try {
    res.render("New");
  } catch (error) {
    console.log(error);
  }
});

/**
 * Edit
 */
app.get("/tweets/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    // Find the tweet
    const tweet = await Tweet.findById(id);
    console.log(tweet);

    res.render("Edit", { tweet });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Show
 */
app.get("/tweets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findById(id);
    res.render("Show", {
      tweet: tweet,
    });
  } catch (error) {
    console.log("An error occured when finding the tweet ", error);
  }
});

// ***** API ROUTES ***** //
/**
 * ----- Create POST -----
 */
app.post("/api/tweets", async (req, res) => {
  const createdTweet = await Tweet.create(req.body);

  res.redirect(`/tweets/${createdTweet._id}`);
});

/**
 * Update Tweet - use 'put' when receiving data from the front end
 */
app.put("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;
  const { sponsored } = req.body;

  sponsored === "on"
    ? (req.body.sponsored = true)
    : (req.body.sponsored = false);

  try {
    // console.log(req.body);
    const updatedTweet = await Tweet.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.redirect(`/tweets/${id}`);
  } catch (error) {
    console.log("An error occurred: ", error);
  }
});

/**
 * ----- Seed Tweets -----
 */
app.get("/api/tweets/seed", async (req, res) => {
  const createdTweets = await Tweet.insertMany(manyTweets);
  res.send(createdTweets);
});

/**
 * ----- Delete Tweet -----
 */
app.delete("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTweet = await Tweet.findByIdAndDelete(id);

    console.log("Deleted: ", deletedTweet);
    // Redirect after deletion
    res.redirect("/tweets");
  } catch (error) {
    console.log("There was an error deleting the tweet ", error);
  }
});

/**
 * ----- Add Comment -----
 */
app.put("/api/tweets/add-comment/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findById(id);

    tweet.comments.push(req.body);
    const updatedTweet = Tweet.findByIdAndUpdate(id, tweet, { new: true });

    res.send(updatedTweet);
  } catch (error) {
    console.log("There was error add the comment: ", error);
  }
});

/**
 * ----- Update Likes ----- when use 'get' since we're not receiving data from the front end, just updating the likes
 */
app.get("/api/tweets/add-like/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tweetToUpdate = await Tweet.findById(id);
    tweetToUpdate.likes++;

    const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate, {
      new: true,
    });

    // Redirect after Update
    res.redirect("/tweets");
  } catch (error) {
    console.log("An error occurred updating the tweet: ", error);
  }
});

// ***** Connect to the database ***** //
connectDB();

// ***** Listen to the port ***** //
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
