import { Subscriber } from "../models";
import { ejs, path } from "../config";
import { API_DOMAIN, DOMAIN } from "../constants";
import sendMail from "../functions/email-sender";
import createNotification from "../functions/notification";
import { ErrorHandler, SuccessHandler } from "../functions/response-handler";

exports.getAllSubscribers = async (req, res, next) => {
  try {
    Subscriber.find()
      .exec()
      .then((docs) => {
        const response = {
          count: docs.length,
          subscribers: docs.map((doc) => {
            return {
              email: doc.email,
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

exports.getSingleSubscriber = async (req, res, next) => {
  try {
    let { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      throw new ErrorHandler(404, "getSingleSubscriber", 15000, "Malformed ID");
    }

    let subscriber = await Subscriber.findOne({ _id: id });

    if (!subscriber) {
      throw new ErrorHandler(
        404,
        "getSingleSubscriber",
        15001,
        "Subscriber with id not found"
      );
    }

    SuccessHandler(res, "success", 200, "ok", subscriber);
  } catch (err) {
    return next(err);
  }
};

exports.createSubscriber = async (req, res, next) => {
  try {
    // Create a new Subscriber
    let { body } = req;
    let email = body.email;

    //check for duplicate slug;
    let emailFound = await Subscriber.findOne({ email });
    if (emailFound) {
      throw new ErrorHandler(
        400,
        "createSubscriber",
        15002,
        "Already Subscribed"
      );
    }

    let subscriber = new Subscriber({
      ...body,
    });

    await subscriber.save();

    //send email to subscriber

    const emailTemplate = await ejs.renderFile(
      path.join(__dirname, "../templates/emailTemplate.ejs"),
      {
        user: "Mboalab enthusiast",
        email: `${email}`,
        title: "Successfully subscribed to Newsletter | MboaLab",
        imageUrl:
          "https://drive.google.com/uc?id=1RvaW5sOIMiSMaoaI6J-EnibfT7AwRaGj",
        mode: "main",
        imageText: "Newsletter | Mboalab",
        stageOneText:
          "You have successfully subscribed to our newsletter concerning the Data Science Project. We will keep you up to date with all necessary information henceforth.",
        stageOneButtonText: "Go to Site",
        stageTwoText:
          "If you didn't perform this action, kindly reach out to us to revert this. Keep using Mboalab",
        url: `${DOMAIN}`,
      }
    );

    await sendMail(
      email,
      "Subscribed to Newsletter on MboaLab",
      emailTemplate
    );

    //end send mail

    SuccessHandler(res, "success", 201, "ok", subscriber);
  } catch (err) {
    return next(err);
  }
};

exports.updateSubscriber = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { body } = req;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      throw new ErrorHandler(404, "updateSubscriber", 15003, "Malformed ID");
    }

    let subscriber = await Subscriber.findOneAndUpdate(
      { _id: id },
      {
        ...body,
      },
      { new: true }
    );

    if (!subscriber) {
      throw new ErrorHandler(
        404,
        "updateSubscriber",
        15004,
        "Subscriber not found"
      );
    }

    SuccessHandler(res, "success", 200, "ok", subscriber);
  } catch (err) {
    return next(err);
  }
};

exports.deleteSubscriber = async (req, res, next) => {
  try {
    let { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      throw new ErrorHandler(404, "deleteSubscriber", 15005, "Malformed ID");
    }

    // Chcek if the subscriber with the id is in the database or not?
    let subscriber = await Subscriber.findById(id);
    if (!subscriber) {
      throw new ErrorHandler(
        404,
        "deleteSubscriber",
        15006,
        "Subscriber with id not found"
      );
    }

    subscriber = await Subscriber.deleteOne({ _id: id });

    SuccessHandler(res, "success", 200, "ok", []);
  } catch (err) {
    return next(err);
  }
};
