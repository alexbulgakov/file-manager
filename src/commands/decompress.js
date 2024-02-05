import { extname, resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream";
import logOperationFailed from "../loggers/logOperationFailed.js";
import logInvalidInput from "../loggers/logInvalidInput.js";
import isExists from "../functions/isExists.js";

const decompress = async (params) => {
  if (!params) {
    logInvalidInput();
    return;
  }

  const workingDir = process.cwd();
  const paramsArr = params.split(" ");

  if (paramsArr.length < 2) {
    logInvalidInput();
    return;
  }

  const pathToFile = resolve(workingDir, paramsArr[0]);
  const fileName = pathToFile.slice(0, -3);
  const pathToDestination = resolve(workingDir, paramsArr[1], `${fileName}`);

  try {
    const _isExists = await isExists(pathToFile);
    const fileExtension = extname(pathToFile);

    if (_isExists && fileExtension === ".br") {
      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(pathToDestination);
      const compressedStream = createBrotliDecompress();

      pipeline(
        readStream,
        compressedStream,
        writeStream,
        (e) => e && logOperationFailed()
      );

      console.log("File has been decompressed");
    } else {
      logInvalidInput();
    }
  } catch {
    logOperationFailed();
  }
};

export default decompress;
