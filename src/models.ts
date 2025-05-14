interface PathValue {
  path: string;
  value: string;
}

export type MultiPathValue = readonly PathValue[];

export interface RunnerInputs {
  organization: string;
  repository: string;
  sourceBranch: string;
  outputBranch: string;
  sourcePath: string;
  outputPath: string;
  set: MultiPathValue;
  setBoolean: MultiPathValue;
  setArrayItem: MultiPathValue;
  removeFromArray: MultiPathValue;
  commitMessage: string;
}

export interface Inputs extends RunnerInputs {
  githubToken: string;
}
