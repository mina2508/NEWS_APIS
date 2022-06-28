const express = require('express');
const newsRouter = express.Router();
require('dotenv').config();
const sourcesUrl = process.env.SOURCES_URL;
const NEWSAPI_URL = process.env.NEWSAPI_URL;
const axios = require('axios');
const UserModel = require('../User/userModel');
const {
  notSubscribedSource,
  userHasNoSubscribtions,
} = require('../helpers/customError');
//Bring All sources
newsRouter.get('/', async (req, res, next) => {
  const news_get = await axios.get(sourcesUrl);
  const sourceNames = news_get.data.sources.map((source) => source.name);
  res.send(sourceNames);
});
//Subscribe To A Source
newsRouter.patch('/:sourceName/subscribe', async (req, res, next) => {
  const { sourceName } = req.params;
  const { userId } = req.body;
  //check whether there is a source with this name
  const news_get = await axios.get(`${NEWSAPI_URL}&sources=${sourceName}`);
  //adding the source to the user
  await UserModel.findByIdAndUpdate(userId, {
    $addToSet: { sourceNames: sourceName },
  });

  res.send({ message: 'subscription successfull' });
});
//UnSubscribe To A Source

newsRouter.patch('/:sourceName/unsubscribe', async (req, res, next) => {
  const { sourceName } = req.params;
  const { userId } = req.body;

  await UserModel.findByIdAndUpdate(userId, {
    $pull: { sourceNames: sourceName },
  });

  res.send({ message: 'unsubscription successfull' });
});
//Bring All Subscribed Sources Articles
newsRouter.get('/mysources', async (req, res, next) => {
  const { userId } = req.body;
  const user = await UserModel.findOne(
    {
      _id: userId,
    },
    { sourceNames: 1 }
  );
  const sourceNames = user.sourceNames.join();
  if (!user.sourceNames) throw userHasNoSubscribtions;
  const news_get = await axios.get(`${NEWSAPI_URL}&sources=${sourceNames}`);
  res.send(news_get.data.articles);
});
//Bring Certain Subscribed Sources Articles

newsRouter.get('/:sourceName', async (req, res, next) => {
  const { sourceName } = req.params;
  const { userId } = req.body;
  //Check Whether the User has Subscribed to this source
  const user = await UserModel.findOne({
    _id: userId,
    sourceNames: sourceName,
  });
  if (!user) throw notSubscribedSource;
  const news_get = await axios.get(`${NEWSAPI_URL}&sources=${sourceName}`);
  res.send(news_get.data.articles);
});

module.exports = newsRouter;
