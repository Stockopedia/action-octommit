# Octommit V2

Utility to update yaml files in git. Accompanying repo - <https://github.com/Stockopedia/octommit>

# What's new

- Updated to the node16 runtime by default
  - This requires a minimum [Actions Runner](https://github.com/actions/runner/releases/tag/v2.285.0) version of
    v2.285.0 to run, which is by default available in GHES 3.4 or later.

# Usage

```yaml
- uses: Stockopedia/octommit@v2
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    script: |
      return octommit.update()
        .org("Stockopedia")
        .repository("action-octommit")
        .sourceBranch("main")
        .outputBranch("main")
        .sourcePath("test-file.yaml")
        .outputPath("test-file.yaml")
        .set("testRunDate", new Date().toString())
        .commit("[skip ci] test commit")
        .run();
```
