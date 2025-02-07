import { useDispatch } from "react-redux";
import { useState } from "react";
import { createGoal } from "./../features/goals/goalSlice.js";
import { useNavigate } from "react-router-dom";
import { getGoals, reset } from "../features/goals/goalSlice.js";

function GoalForm() {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };

  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Goal</label>
            <input
              type="text"
              value={text}
              name="text"
              id="text"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add Goal
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default GoalForm;
