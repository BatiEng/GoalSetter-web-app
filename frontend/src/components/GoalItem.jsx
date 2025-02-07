import { useDispatch } from "react-redux";
import { deleteGoal } from "./../features/goals/goalSlice.js";

function GoalItem(goal) {
  const dispatch = useDispatch();
  console.log(goal);
  return (
    <>
      <div className="goal">
        <div>{new Date(goal.goal.createdAt).toLocaleString("en-US")}</div>
      </div>
      <h2>{goal.goal.text}</h2>
      <button
        onClick={() => {
          console.log(dispatch(deleteGoal(goal.goal._id)) + "BATIKAN");
          dispatch(deleteGoal(goal.goal._id));
        }}
        className="close"
      >
        X
      </button>
    </>
  );
}

export default GoalItem;
