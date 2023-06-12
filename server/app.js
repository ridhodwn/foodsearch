if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const axios = require("axios");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/search", async (req, res, next) => {
  try {
    const { query } = req.query;
    const { data } = await axios({
      method: "get",
      url: 'https://api.edamam.com/api/recipes/v2',
      params: {
        type: 'public',
        q: query,
        app_id: process.env.APP_ID,
        app_key: process.env.APP_KEY
      }
    });
    if(data.count === 0) {
        throw {name: 'Not found'};
    }
    if(data.message === 'Usage limits are exceeded') {
        throw {name: 'Usage limits are exceeded'};
    }
    res.status(200).json(data);
  } catch(error) {
    if(error.name === 'Not found') {
        res.status(404).json({message: 'Not found'});
    } else if(error.response.status === 429) {
        res.status(error.response.status).json({message: error.response.data.message});
    } else  {
        res.status(500).json({message: 'Internal server error'});
    }
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
