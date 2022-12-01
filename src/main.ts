import * as core from "@actions/core";
import { Octommit } from "@stockopedia/octommit";
import { getInputs } from "./inputs";
import { runAction } from "./runner";

// process.on("unhandledRejection", handleError);
main().catch(handleError);

export async function main(): Promise<void> {
  core.setCommandEcho(true)
  const { githubToken, ...inputs } = getInputs(core);

  core.info(`Got inputs ${JSON.stringify(inputs)}`)
  const octommit = new Octommit(githubToken);
  const result = await runAction(octommit, inputs);
  core.info(`Got result: ${result}`)
  core.setOutput("result", result);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(err: any): void {
  console.error(err);
  core.setFailed(`Unhandled error: ${err}`);
}
