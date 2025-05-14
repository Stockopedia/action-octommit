interface PathValue<T> {
  path: string;
  value: T;
}

export type MultiPathValue<T> = readonly PathValue<T>[];

export interface RunnerInputs {
  organization: string;
  repository: string;
  sourceBranch: string;
  outputBranch: string;
  sourcePath: string;
  outputPath: string;
  set: MultiPathValue<string>;
  setBoolean: MultiPathValue<boolean>;
  setArrayItem: MultiPathValue<string>;
  removeFromArray: MultiPathValue<string>;
  commitMessage: string;
}

export interface Inputs extends RunnerInputs {
  githubToken: string;
}
