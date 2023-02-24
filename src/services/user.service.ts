import * as httpStatus from "http-status";
import User from "../models/user.model";
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  } else if (await User.isUsernameTaken(userBody.userName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "userName already taken");
  }
  const usr = await User.create(userBody);
  return usr.toObject();
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id).lean();
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email }).lean();
};

const getUserByAddress = async (address) => {
  return User.findOne({ address }).lean();
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await User.findByIdAndUpdate(userId, updateBody, {
    new: true,
  }).lean();

  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} artworkId
 * @returns {Promise<User>}
 */
const addArtworkToFavourites = async (userId, artworkId) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { $push: { favouriteArtworks: artworkId } }
  ).lean();
};

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} artworkId
 * @returns {Promise<User>}
 */
const removeArtworkFromFavourite = async (userId, artworkId) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { favouriteArtworks: artworkId } }
  ).lean();
};

/**
 *
 * @param {ObjectId} userId
 * @param {number} page
 * @param {number} perPage
 */

const getFavouriteArtworks = async (userId, page, perPage) => {
  const user = await User.findOne({ _id: userId })
    .select(["favouriteArtworks"])
    .populate("favouriteArtworks")
    .limit(parseInt(perPage))
    .skip(page * perPage)
    .lean();

  return user ? user.favouriteArtworks : [];
};

const followOtherUser = async (userId, otherUserId) => {
  await User.findOneAndUpdate(
    { _id: otherUserId },
    { $push: { followers: userId } },
    { new: true }
  );
  return await User.findOneAndUpdate(
    { _id: userId },
    { $push: { following: otherUserId } },
    { new: true }
  ).lean();
};

const unFollowUser = async (userId, otherUserId) => {
  await User.findOneAndUpdate(
    { _id: otherUserId },
    { $pull: { followers: userId } },
    { new: true }
  );
  return await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { following: otherUserId } },
    { new: true }
  ).lean();
};

const getUserFollowers = async (userId, page, perPage) => {
  const user = await User.findOne({ _id: userId })
    .populate({
      path: "followers",
      options: {
        limit: parseInt(perPage),
        skip: page * perPage,
      },
    })
    .lean();
  return user.followers;
};

const getUserFollowing = async (userId, page, perPage) => {
  const user = await User.findOne({ _id: userId })
    .populate({
      path: "following",
      options: {
        limit: parseInt(perPage),
        skip: page * perPage,
      },
    })
    .lean();
  return user.following;
};

const removeArtwork = async (userId, artworkId) => {
  await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { artworks: artworkId } }
  );
};

const searchUsersByName = async (keyword, page, perPage) => {
  return await User.find({ userName: { $regex: keyword, $options: "i" } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};

const getUsersByMostArtworks = async () => {
  return await Stats.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $match: {
        $and: [
          {
            "user.role": "artist",
          },
          {
            soldArts: { $gt: 0 },
          },
        ],
      },
    },
    {
      $sort: {
        soldArts: -1,
      },
    },
    {
      $unwind: "$user",
    },
  ]).limit(5);
};

export {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getUserByAddress,
  addArtworkToFavourites,
  removeArtworkFromFavourite,
  getFavouriteArtworks,
  followOtherUser,
  unFollowUser,
  getUserFollowers,
  getUserFollowing,
  removeArtwork,
  searchUsersByName,
  getUsersByMostArtworks,
};
