import { writeFile } from "fs/promises";
import { resolve } from "path";
import logInvalidInput from "../loggers/logInvalidInput.js";

import logOperationFailed from "../loggers/logOperationFailed.js";

const add = async (fileName) => {
  const workingDir = process.cwd();
  const filePath = resolve(workingDir, fileName);

  if (!fileName) {
    logInvalidInput();
    return;
  }

  try {
    await writeFile(filePath, "", { flag: "wx" });
    console.log(`New file ${fileName} has been created.`);
  } catch {
    logOperationFailed();
  }
};

export default add;
