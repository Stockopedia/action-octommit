import { ActionsCore } from "../../types";
import { mock } from "../helpers";

export interface RawInputs {
  "github-token": string;
  organization: string;
  repository: string;
  "source-branch": string;
  "output-branch": string;
  "source-path": string;
  "output-path": string;
  set: string;
  "set-array-item": string;
  "remove-from-array": string;
  "commit-message": string;
}

export function mockActionsCore(
  overrides: Partial<RawInputs> = {},
): ActionsCore {
  const rawInputs: RawInputs = {
    "github-token": "abc123",
    organization: "Stockopedia",
    repository: "action-octommit",
    "source-branch": "source",
    "output-branch": "target",
    "source-path": "source.yaml",
    "output-path": "target.yaml",
    set: "parent1:child1=value1;parent4:child4=true",
    "set-array-item": "parent2:child2=value2",
    "remove-from-array": "parent3:child3=value3",
    "commit-message": "ci: update",
    ...overrides,
  };
  return mock<ActionsCore>({
    getInput: jest.fn((key: keyof RawInputs) => rawInputs[key]),
  });
}
