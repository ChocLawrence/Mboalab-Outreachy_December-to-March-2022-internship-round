import { DOMAIN } from "../constants";
import { Comment, Post, User, Profile } from "../models";
import { join } from "path";
const fs = require("fs");
import { ErrorHandler, SuccessHandler } from "../functions/response-handler";

exports.getAllComments = async (req, res, next) => {
  try {
    let { post } = req.query;

    if (!post) {
      throw new ErrorHandler(404, "getAllComments", 21001, "Missing post ID");
    }

    if (post && !post.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      throw new ErrorHandler(404, "getAllComments", 21001, "Malformed Post ID");
    }

    if (post && post.match(/^[0-9a-fA-F]{24}$/)) {
      var postFound = await Post.findById(post);

      if (!postFound) {
        throw new ErrorHandler(
          404,
          "getAllComments",
          21002,
          "Post with id not found"
        );
      }
    }

    let searchObject = {};

    if (postFound) {
      searchObject.post = postFound._id;
    }

    Comment.find(searchObject)
      .sort({ createdAt: -1 })
      .exec()
      .then((docs) => {
        const response = {
          count: docs.length,
          comments: docs.map((doc) => {
            return {
              text: doc.text,
              user: doc.user,
              names: doc.names,
              avatar: doc.avatar,
              post: doc.post,
              createdat: doc.createdAt,
              updatedat: doc.updatedAt,
              _id: doc._id,
            };
          }),
        };

        SuccessHandler(res, "success", 200, "ok", response);
      });
  } catch (err) {
    return next(err);
  }
};

exports.getSingleComment = async (req, res, next) => {
  try {
    let { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      throw new ErrorHandler(404, "getSingleComment", 50000, "Malformed ID");
    }

    let comment = await Comment.findOne({ _id: id });

    if (!comment) {
      throw new ErrorHandler(
        404,
        "getSingleComment",
        50001,
        "Comment with id not found"
      );
    }

    SuccessHandler(res, "success", 200, "ok", comment);
  } catch (err) {
    return next(err);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    // Create a new Comment
    let { body, params, user } = req;

    if (!body.text) {
      throw new ErrorHandler(
        404,
        "createComment",
        50001,
        "Comment missing text"
      );
    }

    if (!params.id) {
      throw new ErrorHandler(
        404,
        "createComment",
        50001,
        "Comment missing post id"
      );
    }

    let usr = await User.findById(user._id);
    if (!usr) {
      throw new ErrorHandler(
        404,
        "createComment",
        17005,
        "User with id not found"
      );
    }

    let profile = await Profile.findOne({ account: user._id });

    let comment = new Comment({
      user: req.user._id,
      names: usr.firstname + " " + usr.lastname,
      avatar: profile.avatar,
      text: body.text,
      post: params.id,
    });

    await comment.save();

    SuccessHandler(res, "success", 201, "ok", comment);
  } catch (err) {
    return next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { user, body } = req;
    // Chcek if the post with the id is in the database or not?
    let comment = await Comment.findById(id);

    if (!comment) {
      throw new ErrorHandler(404, "updateComment", 50002, "Comment not found");
    }

    if (comment.user.toString() !== user._id.toString()) {
      throw new ErrorHandler(
        401,
        "updateComment",
        50003,
        "Comment doesn't belong to you."
      );
    }

    comment = await Comment.findOneAndUpdate(
      { user: user._id, _id: id },
      {
        ...body,
        post: comment.post,
      },
      { new: true }
    );

    SuccessHandler(res, "success", 200, "ok", comment);
  } catch (err) {
    return next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { user } = req;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      throw new ErrorHandler(404, "deleteComment", 50004, "Malformed ID");
    }

    // Chcek if the post with the id is in the database or not?
    let comment = await Comment.findById(id);
    if (!comment) {
      throw new ErrorHandler(
        404,
        "deleteComment",
        50005,
        "Comment with id not found"
      );
    }

    if (user.role !== "admin") {
      if (comment.user.toString() !== user._id.toString()) {
        throw new ErrorHandler(
          401,
          "deleteComment",
          50006,
          "Comment doesn't belong to you."
        );
      }
    }

    comment = await Comment.deleteOne({ _id: id });

    SuccessHandler(res, "success", 200, "ok", null);
  } catch (err) {
    return next(err);
  }
};
