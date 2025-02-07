import Goal from "./../models/goalModel.js";
import User from "./../models/userModel.js";
import mongoose from "mongoose";

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });
    res.status(200).json(goals);
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: "error occured while fetching data" });
  }
};
export const postGoals = async (req, res) => {
  let { text } = req.body;
  text = text.trim();
  if (text === "") {
    return res
      .status(404)
      .json({ success: false, message: "you have to add text value" });
  }
  try {
    const newGoal = new Goal({ text, user: req.user._id });
    newGoal
      .save()
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "goal added to the DB succesfully",
          data: result,
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "error occured while saving Goal",
        });
      });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `error occured while posting goal ${err}`,
    });
  }
};
export const putGoals = async (req, res) => {
  const id = req.params.id;

  const goalText = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "please provide valid ID" });
  }
  try {
    const goal = await Goal.findById(id);
    const user = req.user;
    // check user
    console.log("deneme 1");
    if (!user) {
      res.status(401).json({
        success: false,
        message: "we can not find user while posting goal",
      });
    }
    console.log("deneme 2");

    // make sure goal id and user id matches
    if (goal.user.toString()) {
      console.log("var");
    }
    console.log();
    console.log(user._id);
    if (goal.user.toString() !== user._id.toString()) {
      res.status(401).json({
        success: false,
        message: "user not authorized",
      });
    }
    console.log("deneme 3");

    const updatedGoal = await Goal.findByIdAndUpdate(id, goalText, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "goal updated succesfuly",
      data: updatedGoal,
    });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: "error occured while updating data" });
  }
};
export const deleteGoals = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "please provide valid ID" });
  }
  try {
    const user = await User.findById(req.user._id);
    console.log("deneme1");
    // check user
    if (!user) {
      res.status(401).json({
        success: false,
        message: "we can not find user while posting goal",
      });
    }
    console.log("deneme2");

    // make sure goal id and user id matches

    console.log("deneme3");

    const goal = await Goal.findByIdAndDelete(id);
    if (goal.user.toString() !== user.id) {
      res.status(401).json({
        success: false,
        message: "user not authorized",
      });
    }
    res.status(200).json({ success: true, id });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: "error occured while deleting data" });
  }
};
