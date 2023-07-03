import fs from "node:fs";
import { select, confirm, input } from "@inquirer/prompts";
import path from "node:path";
import { mkdir, copyFile, rm, stat, readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const version = "1.3.1";
console.log(`当前脚本版本：${version}`);

const root = process.cwd();
const templateDir = path.resolve(
  fileURLToPath(import.meta.url),
  "../",
  "public/template"
);

async function init() {
  const start = await select({
    message: "请选择",
    choices: [
      { name: "创建项目文件", value: "create" },
      { name: "初始化项目", value: "manifest" },
    ],
  });

  switch (start) {
    case "create":
      const createDirName = await input({ message: "创建项目文件夹的名称" });
      const createDirUrl = path.join(root, createDirName);
      try {
        await validateUrl(createDirUrl);
        const answer = await confirm({ message: "文件夹已存在，是否覆盖" });
        if (!answer) break;
      } catch (e) {
        const answer = await confirm({ message: "文件夹不存在，是否创建" });
        if (!answer) break;
      }
      console.log("创建中...");
      await createUniAppDir(createDirUrl);
      console.log("创建成功");
      break;
    case "manifest":
      const createName = await input({ message: "创建项目的名称" });
      const createUrl = path.join(root, createName);
      try {
        await validateUrl(createUrl);
        const answer = await confirm({ message: "文件已存在，是否覆盖" });
        if (!answer) break;
      } catch (e) {
        const answer = await confirm({ message: "文件不存在，是否创建" });
        if (!answer) break;
      }
      console.log("创建中...");
      await createUniApp(createUrl);
      await updateManifestFile(createUrl, createName);
      console.log("创建成功");
      break;
    default:
      break;
  }
}

function validateUrl(url: string) {
  return new Promise((resolve, reject) => {
    fs.access(url, fs.constants.R_OK | fs.constants.W_OK, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve(url);
    });
  });
}

async function createUniAppDir(url: string) {
  await rm(url, { recursive: true, force: true });
  await mkdir(url);
  await mkdir(path.join(url, "accept"));
  const assetsDir = await mkdir(path.join(url, "assets"), {
    recursive: true,
  });
  await mkdir(path.join(url, "code"));
  assetsDir && (await mkdir(path.join(assetsDir, "a面")));
  assetsDir && (await mkdir(path.join(assetsDir, "a面切图")));
  assetsDir && (await mkdir(path.join(assetsDir, "上架图")));
  await copy(path.join(templateDir, "README.md"), path.join(url, "README.md"));
}

async function createUniApp(url: string) {
  await rm(url, { recursive: true, force: true });
  await mkdir(url);
  await copy(path.join(templateDir, "uniapp-vue3-temp"), url);
}

async function updateManifestFile(url: string, name: string) {
  const filePath = path.join(url, "manifest.json");
  const manifest = JSON.parse(await readFile(filePath, { encoding: 'utf8' }));
  manifest.name = name;
  await writeFile(filePath, JSON.stringify(manifest, null, 4));
}

async function copy(src: string, dest: string) {
  const statData = await stat(src);
  if (statData.isDirectory()) {
    await copyDir(src, dest);
  } else {
    await copyFile(src, dest);
  }
}

async function copyDir(srcDir: string, destDir: string) {
  await mkdir(destDir, { recursive: true });
  for (const file of await readdir(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    await copy(srcFile, destFile);
  }
}

init().catch((e) => {
  console.error(e);
});
