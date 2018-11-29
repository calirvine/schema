import { exec } from "child_process";
import util from "util";
import path from "path";

const execAsync = util.promisify(exec);
const allExamples = [
  "ts-ast-reader",
  "star-wars",
  "kitchen-sink",
  "githunt-api",
  "apollo-fullstack",
];

async function unlinkDir(dir: string) {
  await execAsync("rm -rf graphql", {
    cwd: path.join(dir, "node_modules"),
  });
  await execAsync("yarn unlink gqliteral", {
    cwd: dir,
  });
  await execAsync("yarn --force", {
    cwd: dir,
  });
}

async function unlinkExamples() {
  await Promise.all(
    allExamples
      .map(async (exampleDir) => {
        const dir = path.join(__dirname, `../examples/${exampleDir}`);
        console.log(`Unliking ${exampleDir}`);
        unlinkDir(dir);
        console.log(`Finished unlinking ${exampleDir}`);
      })
      .concat(
        (async () => {
          console.log("Unlinking website");
          await unlinkDir(path.join(__dirname, "../website"));
          console.log("Finished unlinking website");
        })()
      )
  );
}

unlinkExamples()
  .then(() => {
    console.log("All examples using published graphqliteral");
  })
  .catch((e) => {
    console.error(e);
  })
  .then(() => {
    process.exit();
  });