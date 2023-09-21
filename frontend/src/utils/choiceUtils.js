export const updateChoice = (state) => {
  localStorage.setItem("choice", JSON.stringify(state));
  return state;
};
