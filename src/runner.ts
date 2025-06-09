import { Octommit } from "@stockopedia/octommit";
import { RunnerInputs } from "./models";

export async function runAction(
  octommit: Octommit,
  inputs: RunnerInputs,
): Promise<string> {
  let command = octommit
    .update()
    .org(inputs.organization)
    .repository(inputs.repository)
    .sourceBranch(inputs.sourceBranch)
    .outputBranch(inputs.outputBranch)
    .sourcePath(inputs.sourcePath)
    .outputPath(inputs.outputPath);

  inputs.set.forEach(({ path, value }) => {
    command = command.set(path, value);
  });

  inputs.setBoolean.forEach(({ path, value }) => {
    // octommit assumes everything is a string but will function properly with any type
    command = command.set(path, !!value as unknown as string);
  });

  inputs.setArrayItem.forEach(({ path, value }) => {
    command = command.setArrayItem(path, value);
  });

  inputs.removeFromArray.forEach(({ path, value }) => {
    command = command.removeFromArray(path, value);
  });

  return await command.commit(inputs.commitMessage).run();
}
