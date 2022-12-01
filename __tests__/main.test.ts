import * as core from "@actions/core";
import { Octommit } from "@stockopedia/octommit";
import { main } from "../src/main";
import type { RawInputs } from "./mocks/actions-core";
import Mock = jest.Mock;

jest.mock("@actions/core", () => {
  const rawInputs: RawInputs = {
    "github-token": "abc123",
    organization: "Stockopedia",
    repository: "action-octommit",
    "source-branch": "source",
    "output-branch": "target",
    "source-path": "source.yaml",
    "output-path": "target.yaml",
    set: "parent1:child1=value1",
    "set-array-item": "parent2:child2=value2",
    "remove-from-array": "parent3:child3=value3",
    "commit-message": "ci: update",
  };
  return {
    getInput: jest.fn((key: keyof RawInputs) => {
      return rawInputs[key];
    }),
    setOutput: jest.fn(),
    setFailed: jest.fn(),
  };
});

jest.mock("@stockopedia/octommit", () => {
  return {
    Octommit: jest.fn(() => ({
      update: jest.fn(() => ({
        org: jest.fn(() => ({
          repository: jest.fn(() => ({
            sourceBranch: jest.fn(() => ({
              outputBranch: jest.fn(() => ({
                sourcePath: jest.fn(() => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const commandMock: any = {
                    set: jest.fn(() => commandMock),
                    setArrayItem: jest.fn(() => commandMock),
                    removeFromArray: jest.fn(() => commandMock),
                    commit: jest.fn(() => ({
                      run: jest.fn(() => Promise.resolve("output")),
                    })),
                  };
                  return {
                    outputPath: jest.fn(() => commandMock),
                  };
                }),
              })),
            })),
          })),
        })),
      })),
    })),
  };
});

describe("main", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should invoke the command in the input with the token", async () => {
    await main();

    expect(Octommit).toHaveBeenCalledWith("abc123");

    expect(core.setOutput).toHaveBeenCalledWith("result", "output");
  });

  it("should set a failure when there is an error", async () => {
    (Octommit as unknown as Mock).mockImplementation(() => {
      throw new Error("Failed");
    });

    await expect(main()).rejects.toEqual(new Error("Failed"));

    expect(core.setOutput).not.toHaveBeenCalled();
  });
});
