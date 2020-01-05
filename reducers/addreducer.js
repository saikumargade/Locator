const initialState = {
  added: undefined
};

const addreducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        added: action.payload
      };
    default:
      return state;
  }
};
export default addreducer;
