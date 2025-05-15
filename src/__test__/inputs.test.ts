import { getInputs, InputError } from "../inputs";
import { MultiPathValueError } from "../multi-path-value";
import { mockActionsCore } from "./mocks/actions-core";

describe("Inputs", () => {
  describe(getInputs.name, () => {
    it("should handle all specified values", () => {
      const core = mockActionsCore();
      expect(getInputs(core)).toEqual({
        commitMessage: "ci: update",
        organization: "Stockopedia",
        outputBranch: "target",
        outputPath: "target.yaml",
        removeFromArray: [
          {
            path: "parent3:child3",
            value: "value3",
          },
        ],
        repository: "action-octommit",
        set: [
          {
            path: "parent1:child1",
            value: "value1",
          },
        ],
        setBoolean: [
          {
            path: "parent4:child4",
            value: true,
          },
        ],
        setArrayItem: [
          {
            path: "parent2:child2",
            value: "value2",
          },
        ],
        sourceBranch: "source",
        sourcePath: "source.yaml",
        githubToken: "abc123",
      });
    });

    it("should use 'main' as the default source branch", () => {
      const core = mockActionsCore({ "source-branch": "" });
      expect(getInputs(core).sourceBranch).toBe("main");
    });

    it("should use 'main' as the default output branch", () => {
      const core = mockActionsCore({ "output-branch": "" });
      expect(getInputs(core).outputBranch).toBe("main");
    });

    it("should support an empty set", () => {
      const core = mockActionsCore({ set: "" });
      expect(getInputs(core).set).toEqual([]);
    });

    it("should support an empty set-array-item", () => {
      const core = mockActionsCore({ "set-array-item": "" });
      expect(getInputs(core).setArrayItem).toEqual([]);
    });

    it("should use support an empty set-array-item", () => {
      const core = mockActionsCore({ "remove-from-array": "" });
      expect(getInputs(core).removeFromArray).toEqual([]);
    });

    it("should catch and any MultiPathValueError errors and re-throw an InputError with the key", () => {
      const core = mockActionsCore({ "remove-from-array": "foo:bar" });
      expect(() => getInputs(core)).toThrow(
        new InputError(
          "remove-from-array",
          new MultiPathValueError(
            'Could not parse value "foo:bar" - it should contain an = symbol',
          ),
        ),
      );
    });
  });

  describe(InputError.name, () => {
    it("should convert the key and underlying MultiPathValueError to a meaningful string", () => {
      const error = new InputError(
        "remove-from-array",
        new MultiPathValueError(
          'Could not parse value "foo:bar" - it should contain an = symbol',
        ),
      );
      expect(error.message).toBe(
        'In "remove-from-array": Could not parse value "foo:bar" - it should contain an = symbol',
      );
    });
  });
});
