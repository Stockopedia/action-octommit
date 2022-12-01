from subprocess import run
from os import getenv


def main():
    git_process = run(
        ["git", "show-branch", "--no-name", "origin/test"],
        capture_output=True,
        encoding="utf8",
    )
    if git_process.returncode != 0:
        print("Could not retrieve last commit message")
        print(git_process.stderr)
        exit(git_process.returncode)

    last_commit_message = git_process.stdout.strip()
    expected_commit_message = getenv("EXPECTED_COMMIT_MESSAGE")

    if last_commit_message != expected_commit_message:
        print("Last commit message didn't match the expected message!")
        print(f"Expected {expected_commit_message}, but found: {last_commit_message}")
        exit(1)


if __name__ == "__main__":
    main()
