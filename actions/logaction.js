export default logaction = user => {
  return {
    type: "LOGIN",
    payload: user
  };
};
