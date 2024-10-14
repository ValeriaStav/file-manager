import fs from "fs/promises";
import path from "path";

export async function changeDirectory(currentDir, newDir) {
  try {
    const targetDir = path.isAbsolute(newDir)
      ? newDir
      : path.join(currentDir, newDir);
    const normalizedDir = path.normalize(targetDir);

    const stat = await fs.stat(normalizedDir);

    if (stat.isDirectory()) {
      return normalizedDir;
    } else {
      console.log("Invalid input - Not a directory");
      return currentDir;
    }
  } catch (err) {
    console.log("Invalid input - Error:", err.message);
    return currentDir;
  }
}
