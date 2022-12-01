import { Octommit } from "@stockopedia/octommit";
import { mock } from "../helpers";

interface Org {
  org(name: string): Repository;
}

interface Repository {
  repository(name: string): SourceBranch;
}

interface SourceBranch {
  sourceBranch(name: string): OutputBranch;
}

interface OutputBranch {
  outputBranch(name: string): SourcePath;
}

interface SourcePath {
  sourcePath(name: string): OutputPath;
}

interface OutputPath {
  outputPath(name: string): Command;
}

interface Command {
  set(path: string, value: string): Command;
  setArrayItem(path: string, value: string): Command;
  remove(path: string, value: string): Command;
  removeFromArray(path: string, value: string): Command;
  commit(message: string): Commit;
}

interface Commit {
  pr(): Runner;
  run(): Promise<string>;
}

interface Runner {
  run(): Promise<string>;
}

export const runCommandMock = mock<Commit>({
  run: jest.fn(() => Promise.resolve('output')),
});

export const commandMock: Command = mock<Command>({
  set: jest.fn(() => commandMock),
  setArrayItem: jest.fn(() => commandMock),
  removeFromArray: jest.fn(() => commandMock),
  commit: jest.fn(() => runCommandMock),
});

export const outputPathCommandMock = mock<OutputPath>({
  outputPath: jest.fn(() => commandMock),
});

export const sourcePathCommandMock = mock<SourcePath>({
  sourcePath: jest.fn(() => outputPathCommandMock),
});

export const outputBranchCommandMock = mock<OutputBranch>({
  outputBranch: jest.fn(() => sourcePathCommandMock),
});

export const sourceBranchCommandMock = mock<SourceBranch>({
  sourceBranch: jest.fn(() => outputBranchCommandMock),
});

export const repositoryCommandMock = mock<Repository>({
  repository: jest.fn(() => sourceBranchCommandMock),
});

export const orgCommandMock = mock<Org>({
  org: jest.fn(() => repositoryCommandMock),
});

export const octommitMock = mock<Octommit>({
  update: jest.fn(() => orgCommandMock),
});
