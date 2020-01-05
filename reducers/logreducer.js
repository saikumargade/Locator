const initialState = {
  user: undefined
};

const logreducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
export default logreducer;
