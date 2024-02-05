import * as readline from "readline";
import COMMANDS from "./commands/commands.js";
import getUserName from "./functions/getUserName.js";
import getWorkingDir from "./functions/getWorkingDir.js";
import logWorkingDir from "./loggers/logWorkingDir.js";
import logInvalidInput from "./loggers/logInvalidInput.js";

import cat from "./commands/cat.js";
import add from "./commands/add.js";
import rn from "./commands/rn.js";
import cp from "./commands/cp.js";
import mv from "./commands/mv.js";
import rm from "./commands/rm.js";
import up from "./commands/up.js";
import cd from "./commands/cd.js";
import ls from "./commands/ls.js";
import os from "./commands/os/index.js";
import hash from "./commands/hash.js";

const input = process.stdin;
const output = process.stdout;
const username = getUserName(process.argv.slice(2));

process.chdir(getWorkingDir());

const FileManager = () => {
  if (username) {
    const rl = readline.createInterface({ input, output });
    console.log(`Welcome to the File Manager, ${username}!`);
    logWorkingDir(process.cwd());
    rl.on("line", async (command) => {
      switch (command.split(" ")[0]) {
        case COMMANDS.CAT:
          await cat(command.slice(4));
          break;
        case COMMANDS.ADD:
          await add(command.slice(4));
          break;

        case COMMANDS.RN:
          await rn(command.slice(3));
          break;

        case COMMANDS.CP:
          await cp(command.slice(3), false);
          break;

        case COMMANDS.MV:
          await mv(command.slice(3));
          break;

        case COMMANDS.RM:
          await rm(command.slice(3), false);
          break;

        case COMMANDS.EXIT:
          rl.close();
          break;

        case COMMANDS.UP:
          up();
          break;

        case COMMANDS.CD:
          cd(command.slice(3));
          break;

        case COMMANDS.LS:
          ls();
          break;

        case COMMANDS.OS:
          os(command.slice(5));
          break;

        case COMMANDS.HASH:
          await hash(command.slice(5));
          break;

        default:
          logInvalidInput();
      }
      logWorkingDir();
    });
    rl.on("close", () => {
      return console.log(
        `Thank you for using File Manager, ${username}, goodbye!`
      );
    });
  } else {
    logInvalidInput();
  }
};

FileManager();
