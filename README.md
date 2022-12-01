# Octommit V3

Utility to update yaml files in git. Accompanying repo - <https://github.com/Stockopedia/octommit>

# What's new

- Updated to the node16 runtime by default
  - This requires a minimum [Actions Runner](https://github.com/actions/runner/releases/tag/v2.285.0) version of
    v2.285.0 to run, which is by default available in GHES 3.4 or later.

# Usage

```yaml
- uses: Stockopedia/octommit@v3
  with:
    github-token: ${{ github.token }}
    organization: Stockopedia
    repository: action-octommit
    source-branch: main
    output-branch: main
    source-path: test-file.yaml
    output-path: test-file.yaml
    set: "tag=v${{ github.sha }}"
    commit-message: "[skip ci] update for job: ${{ github.run_id }}"
```

See `action.yaml` for details on defaults and options.

## Format of updates

The `set`, `set-array-item` and `remove-from-array` inputs all use the same format to specify path-value pairs. Each pair is specific as:

```shell
parent:child=value
```

Where `parent:child` is the YAML path for Octommit to act on and `value` is the new value to be used in the operation.

You can add whitespace around the `=` and it will be stripped from the path and value.

### Multiple path-values

If you wish to specify multiple path-values for a given operation, separate these with the `;` character, e.g.

```shell
parent1:child1=value1;parent2:child2=value2
```
