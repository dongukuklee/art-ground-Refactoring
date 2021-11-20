const {
  exhibition,
  images,
  users,
  likes,
  comments,
} = require("../../../models");
const { each, keys, filter } = require("underscore");
const { setHash, addToSet } = require("./setCache.ctrl");
const { setExhibitionCache, setImageCache } = require("../../customFunction");

const setUserCache = (userData) => {
  const { id } = userData;
  const userDataKeys = keys(userData);
  each(userDataKeys, (el) => {
    setHash(`user:${id}`, `${el}`, userData[el]);
  });
};

const setLikeCache = (likeData) => {
  const { exhibition_id, user_id } = likeData;
  addToSet(`like:${exhibition_id}`, user_id);
  addToSet(`user:like:${user_id}`, exhibition_id);
};

const setCommentCache = (commentData) => {
  const { id } = commentData;
  const commentDataKeys = keys(commentData);
  addToSet("allComments", id);
  addToSet(`exhibition:comment:${commentData.exhibition_id}`, id);
  each(commentDataKeys, (key) => {
    setHash(`comment:${id}`, key, commentData[key]);
  });
};

module.exports = {
  exhibitionCacheInitialization: async () => {
    each(
      await exhibition.findAll({
        raw: true,
      }),
      (el) => setExhibitionCache(el)
    );
  },
  imageCacheInitialization: async () => {
    each(await images.findAll({ raw: true }), (el) => setImageCache(el));
  },
  userCacheInitialization: async () => {
    each(await users.findAll({ raw: true }), (el) => setUserCache(el));
  },
  likeCacheInitialization: async () => {
    each(await likes.findAll({ raw: true }), (el) => setLikeCache(el));
  },
  commentCacheInitialization: async () => {
    each(
      await comments.findAll({
        attributes: ["id", "exhibition_id", "user_id", "comments", "createdAt"],
        raw: true,
      }),
      (el) => setCommentCache(el)
    );
  },
};
