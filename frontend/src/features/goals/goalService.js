import axios from "axios";

const API_URL = "http://localhost:5001/api/goals/";

const getAllGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const goalService = {
  createGoal,
  getAllGoals,
  deleteGoal,
};

export default goalService;
