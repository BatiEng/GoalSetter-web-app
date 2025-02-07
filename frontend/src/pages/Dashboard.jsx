import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm.jsx";
import Spinner from "./../components/Spinner.jsx";
import { getGoals, reset } from "../features/goals/goalSlice.js";
import GoalItem from "../components/GoalItem.jsx";
import { v4 as uuidv4 } from "uuid";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    } else {
      dispatch(reset());
    }

    if (user) {
      dispatch(getGoals());
    } else {
      navigate("/login");
    }
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    dispatch(getGoals());
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.data.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={uuidv4()} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>you have not any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
