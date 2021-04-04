# Octommit github action

Utility to update yaml files in git. Accompanying repo - <https://github.com/Stockopedia/octommit>

## Usage

```yaml

- uses: Stockopedia/octommit@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    script: |
      octommit.update()
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
