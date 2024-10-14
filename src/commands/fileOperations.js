import fs from "fs/promises";

export async function listFiles(currentDir) {
  try {
    const files = await fs.readdir(currentDir, { withFileTypes: true });

    const fileList = files.map((file, index) => ({
      index,
      Name: file.name,
      Type: file.isDirectory() ? "directory" : "file"
    }));

    console.table(fileList);
  } catch (err) {
    console.error("Operation failed");
  }
}
