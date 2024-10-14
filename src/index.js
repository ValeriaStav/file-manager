import os from "os";
import path from "path";
import { changeDirectory } from "./commands/navigation.js";
import { listFiles } from "./commands/fileOperations.js";

const args = process.argv.slice(2);
const username =
  args.find((arg) => arg.startsWith("--username="))?.split("=")[1] || "User";

console.log(`Welcome to the File Manager, ${username}!`);

let currentDir = os.homedir();
console.log(`You are currently in ${currentDir}`);

const exitProgram = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
};

process.on("SIGINT", exitProgram);

process.stdin.on("data", async (input) => {
  const command = input.toString().trim();
  const [cmd, ...args] = command.split(" ");

  switch (cmd) {
    case "up":
      const parentDir = path.resolve(currentDir, "..");
      if (parentDir !== currentDir) {
        currentDir = parentDir;
      }
      console.log(`You are currently in ${currentDir}`);
      break;

    case "cd":
      const targetDir = args.join(" ").replace(/['"]+/g, "");
      if (targetDir) {
        currentDir = await changeDirectory(currentDir, targetDir);
        console.log(`You are currently in ${currentDir}`);
      } else {
        console.log("Invalid input - No directory specified");
      }
      break;

    case "ls":
      await listFiles(currentDir);
      break;

    case ".exit":
      exitProgram();
      break;

    default:
      console.log("Invalid input");
  }
});
