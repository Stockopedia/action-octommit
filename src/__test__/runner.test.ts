import { RunnerInputs } from "../models";
import { runAction } from "../runner";
import {
  commandMock,
  octommitMock,
  orgCommandMock,
  outputBranchCommandMock,
  outputPathCommandMock,
  repositoryCommandMock,
  runCommandMock,
  sourceBranchCommandMock,
  sourcePathCommandMock,
} from "./mocks/octommit";

describe("Runner", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(runAction.name, () => {
    it("should call the update method on Octommit", async () => {
      await runAction(octommitMock, getRunnerInputs());
      expect(octommitMock.update).toHaveBeenCalledWith();
    });

    it("should set the organization", async () => {
      const inputs = getRunnerInputs();
      await runAction(octommitMock, inputs);
      expect(orgCommandMock.org).toHaveBeenCalledWith(inputs.organization);
    });

    it("should set the repository", async () => {
      const inputs = getRunnerInputs();
      await runAction(octommitMock, inputs);
      expect(repositoryCommandMock.repository).toHaveBeenCalledWith(
        inputs.repository,
      );
    });

    it("should set the source branch", async () => {
      const inputs = getRunnerInputs();
      await runAction(octommitMock, inputs);
      expect(sourceBranchCommandMock.sourceBranch).toHaveBeenCalledWith(
        inputs.sourceBranch,
      );
    });

    it("should set the output branch", async () => {
      const inputs = getRunnerInputs();
      await runAction(octommitMock, inputs);
      expect(outputBranchCommandMock.outputBranch).toHaveBeenCalledWith(
        inputs.outputBranch,
      );
    });

    it("should set the source path", async () => {
      const inputs = getRunnerInputs();
      await runAction(octommitMock, inputs);
      expect(sourcePathCommandMock.sourcePath).toHaveBeenCalledWith(
        inputs.sourcePath,
      );
    });

    it("should set the output path", async () => {
      const inputs = getRunnerInputs();
      await runAction(octommitMock, inputs);
      expect(outputPathCommandMock.outputPath).toHaveBeenCalledWith(
        inputs.outputPath,
      );
    });

    it("should set the output path", async () => {
      const inputs = getRunnerInputs();
      await runAction(octommitMock, inputs);
      expect(outputPathCommandMock.outputPath).toHaveBeenCalledWith(
        inputs.outputPath,
      );
    });

    describe("set", () => {
      it("should not call set when there are no set inputs", async () => {
        const inputs = getRunnerInputs({ set: [] });
        await runAction(octommitMock, inputs);
        expect(commandMock.set).not.toHaveBeenCalled();
      });

      it("should call set for a single path-value combination", async () => {
        const inputs = getRunnerInputs({
          set: [{ path: "parent1:child1", value: "value 1" }],
        });
        await runAction(octommitMock, inputs);
        expect(commandMock.set).toHaveBeenCalledTimes(1);
        expect(commandMock.set).toHaveBeenCalledWith(
          "parent1:child1",
          "value 1",
        );
      });

      it("should call set for multiple path-value combinations", async () => {
        const inputs = getRunnerInputs({
          set: [
            { path: "parent1:child1", value: "value 1" },
            { path: "parent2:child2", value: "value 2" },
          ],
        });
        await runAction(octommitMock, inputs);
        expect(commandMock.set).toHaveBeenCalledTimes(2);
        expect(commandMock.set).toHaveBeenCalledWith(
          "parent1:child1",
          "value 1",
        );
        expect(commandMock.set).toHaveBeenCalledWith(
          "parent2:child2",
          "value 2",
        );
      });
    });

    describe("setArrayItem", () => {
      it("should not call setArrayItem when there are no setArrayItem inputs", async () => {
        const inputs = getRunnerInputs({ setArrayItem: [] });
        await runAction(octommitMock, inputs);
        expect(commandMock.setArrayItem).not.toHaveBeenCalled();
      });

      it("should call setArrayItem for a single path-value combination", async () => {
        const inputs = getRunnerInputs({
          setArrayItem: [{ path: "parent1:child1", value: "value 1" }],
        });
        await runAction(octommitMock, inputs);
        expect(commandMock.setArrayItem).toHaveBeenCalledTimes(1);
        expect(commandMock.setArrayItem).toHaveBeenCalledWith(
          "parent1:child1",
          "value 1",
        );
      });

      it("should call setArrayItem for multiple path-value combinations", async () => {
        const inputs = getRunnerInputs({
          setArrayItem: [
            { path: "parent1:child1", value: "value 1" },
            { path: "parent2:child2", value: "value 2" },
          ],
        });
        await runAction(octommitMock, inputs);
        expect(commandMock.setArrayItem).toHaveBeenCalledTimes(2);
        expect(commandMock.setArrayItem).toHaveBeenCalledWith(
          "parent1:child1",
          "value 1",
        );
        expect(commandMock.setArrayItem).toHaveBeenCalledWith(
          "parent2:child2",
          "value 2",
        );
      });
    });

    describe("removeFromArray", () => {
      it("should not call removeFromArray when there are no removeFromArray inputs", async () => {
        const inputs = getRunnerInputs({ removeFromArray: [] });
        await runAction(octommitMock, inputs);
        expect(commandMock.removeFromArray).not.toHaveBeenCalled();
      });

      it("should call removeFromArray for a single path-value combination", async () => {
        const inputs = getRunnerInputs({
          removeFromArray: [{ path: "parent1:child1", value: "value 1" }],
        });
        await runAction(octommitMock, inputs);
        expect(commandMock.removeFromArray).toHaveBeenCalledTimes(1);
        expect(commandMock.removeFromArray).toHaveBeenCalledWith(
          "parent1:child1",
          "value 1",
        );
      });

      it("should call removeFromArray for multiple path-value combinations", async () => {
        const inputs = getRunnerInputs({
          removeFromArray: [
            { path: "parent1:child1", value: "value 1" },
            { path: "parent2:child2", value: "value 2" },
          ],
        });
        await runAction(octommitMock, inputs);
        expect(commandMock.removeFromArray).toHaveBeenCalledTimes(2);
        expect(commandMock.removeFromArray).toHaveBeenCalledWith(
          "parent1:child1",
          "value 1",
        );
        expect(commandMock.removeFromArray).toHaveBeenCalledWith(
          "parent2:child2",
          "value 2",
        );
      });
    });

    it("should set commit message", async () => {
      const inputs = getRunnerInputs();
      await runAction(octommitMock, inputs);
      expect(commandMock.commit).toHaveBeenCalledWith(inputs.commitMessage);
    });

    it("should run the built command and return its output", async () => {
      const inputs = getRunnerInputs();
      const output = await runAction(octommitMock, inputs);
      expect(runCommandMock.run).toHaveBeenCalledWith();
      expect(output).toBe("output");
    });

    function getRunnerInputs(
      overrides: Partial<RunnerInputs> = {},
    ): RunnerInputs {
      return {
        organization: "Stockopedia",
        repository: "action-octommit",
        sourceBranch: "main",
        outputBranch: "test",
        sourcePath: "source.yaml",
        outputPath: "output.yaml",
        set: [],
        setArrayItem: [],
        removeFromArray: [],
        commitMessage: "ci: update",
        ...overrides,
      };
    }
  });
});
