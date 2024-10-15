import path from "node:path";
import { deleteAsync } from "del";
import chalk from "chalk";

const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, "www");
const BUILD_DIR = path.join(APP_DIR, ".vercel");
const cleanQueue = [BUILD_DIR];
const resultsQueue = [];

async function cleanBuild() {
	for (const dir of cleanQueue) {
		console.log(chalk.yellow(`🟡  Deleting ${dir}...`));
		resultsQueue.push(deleteAsync(dir));
	}
	try {
		await Promise.all(resultsQueue);
	} catch (e) {
		console.log(chalk.red("🔴 Failed to delete build files!"));
		return;
	}
	console.log(chalk.green("🟢 Successfully deleted build files!"));
}

cleanBuild();
