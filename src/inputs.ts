import { Inputs, MultiPathValue } from "./models";
import { parseMultiPathValue } from "./multi-path-value";
import type { ActionsCore } from "./types";

export function getInputs(core: ActionsCore): Inputs {
  const githubToken = core.getInput("github-token", {
    required: true,
    trimWhitespace: true,
  });
  const organization = core.getInput("organization", {
    required: true,
    trimWhitespace: true,
  });
  const repository = core.getInput("repository", {
    required: true,
    trimWhitespace: true,
  });
  const sourceBranch =
    core.getInput("source-branch", { trimWhitespace: true }) || "main";
  const outputBranch =
    core.getInput("output-branch", { trimWhitespace: true }) || "main";

  const sourcePath = core.getInput("source-path", {
    trimWhitespace: true,
    required: true,
  });
  const outputPath = core.getInput("output-path", {
    trimWhitespace: true,
    required: true,
  });

  const set = extractMultiPathValueOption(core, "set");
  const setArrayItem = extractMultiPathValueOption(core, "set-array-item");
  const removeFromArray = extractMultiPathValueOption(
    core,
    "remove-from-array",
  );
  const commitMessage = core.getInput("commit-message", {
    required: true,
    trimWhitespace: true,
  });
  return {
    githubToken,
    organization,
    repository,
    sourceBranch,
    outputBranch,
    sourcePath,
    outputPath,
    set,
    setArrayItem,
    removeFromArray,
    commitMessage,
  };
}

function extractMultiPathValueOption(
  core: ActionsCore,
  name: string,
): MultiPathValue {
  try {
    return parseMultiPathValue(
      core.getInput(name, { trimWhitespace: true }) || "",
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new InputError(name, err);
  }
}

export class InputError extends Error {
  constructor(key: string, error: Error) {
    super(`In "${key}": ${error.message}`);
  }
}
