import * as core from "@actions/core";
import { Octommit } from "@stockopedia/octommit";
import { getInputs } from "./inputs";
import { runAction } from "./runner";

process.on("unhandledRejection", handleError);
main().catch(handleError);

export async function main(): Promise<void> {
  const { githubToken, ...inputs } = getInputs(core);
  const octommit = new Octommit(githubToken);
  const result = await runAction(octommit, inputs);
  core.info(result);
  core.setOutput("result", result);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(err: any): void {
  console.error(err);
  core.setFailed(`Unhandled error: ${err}`);
}
