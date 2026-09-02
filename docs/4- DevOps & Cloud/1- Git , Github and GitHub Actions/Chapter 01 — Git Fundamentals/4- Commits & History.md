# Commits & History

We committed in last sub chapter. Git stores commits as part of the repository's history.

## Create a Commit

```bash
git status
git add <file>
git add .
git commit -m "Add user authentication"
```

Typical workflow:

```text
Working Directory
       ↓ git add
Staging Area
       ↓ git commit
Repository History
```

## View History

```bash
git log
```

Show details of a particular commit:

```bash
git show <commit>
```

Example:

```bash
git show a1b2c3d
```

## Check Previous Changes

```bash
git diff
```

Changes in the staging area:

```bash
git diff --staged
```

Compare with a specific commit:

```bash
git diff <commit>
```

## Undo a Commit

### `reset`

Moves the branch pointer backward.

```bash
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
```

| Option    | Commit | Staging | Working Files |
| --------- | ------ | ------- | ------------- |
| `--soft`  | Undo   | Keep    | Keep          |
| `--mixed` | Undo   | Undo    | Keep          |
| `--hard`  | Undo   | Undo    | Undo          |

### `revert`

Creates a **new commit** that reverses an earlier commit.

```bash
git revert <commit>
```

Generally preferred for commits that have already been pushed/shared.

### Useful References

```bash
HEAD          # Current commit
HEAD~1        # One commit before HEAD
HEAD~2        # Two commits before HEAD
```

Example:

```bash
git show HEAD
git show HEAD~1
```

