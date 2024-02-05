import cp from "./cp.js";
import rm from "./rm.js";
import logInvalidInput from "../loggers/logInvalidInput.js";

const mv = async (params) => {
  if (!params) {
    logInvalidInput();
    return;
  }

  await cp(params, true);
  await rm(params.split(" ")[0], true);
};

export default mv;
