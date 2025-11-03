# Contributing to MCLab

Thank you for your interest in contributing to MCLab! This guide will help you understand our workflow and best practices.

## Table of Contents

- [GitHub Flow Workflow](#github-flow-workflow)
- [Branch Naming Convention](#branch-naming-convention)
- [Keeping Your Branch Updated](#keeping-your-branch-updated)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)

## GitHub Flow Workflow

We follow the [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) workflow to maintain a clean and linear commit history.

### 1. Create a Branch

Create a descriptive branch from `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
```

### 2. Make Changes

Make your changes and commit with clear, descriptive messages:

```bash
git add .
git commit -m "Add feature description"
```

**Best practices for commits:**
- Each commit should contain an isolated, complete change
- Write clear commit messages explaining what and why
- Keep commits focused and atomic

### 3. Create a Pull Request

Push your branch and create a PR:

```bash
git push -u origin feat/your-feature-name
```

Then open a PR on GitHub with:
- Clear title summarizing the change
- Description of what changed and why
- Any relevant context or screenshots

### 4. Address Review Comments

Respond to feedback by:
- Making additional commits to your branch
- Pushing changes (PR updates automatically)
- Engaging in constructive discussion

### 5. Merge Your Pull Request

Once approved:
- The PR will be squashed or merged to `main`
- GitHub preserves the full history

### 6. Delete Your Branch

After merging, delete your branch to keep the repository clean:

```bash
git branch -d feat/your-feature-name
git push origin --delete feat/your-feature-name
```

Or use GitHub's automatic branch deletion feature.

## Branch Naming Convention

Use descriptive prefixes to categorize your changes:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feat/` | New features | `feat/add-dark-mode` |
| `fix/` | Bug fixes | `fix/navbar-mobile-layout` |
| `docs/` | Documentation updates | `docs/update-readme` |
| `security/` | Security-related changes | `security/update-dependencies` |
| `project/` | Personal side projects | `project/john/chat-bot` |

**Examples:**

```bash
# New feature
git checkout -b feat/user-authentication

# Bug fix
git checkout -b fix/login-validation

# Documentation
git checkout -b docs/api-examples

# Personal project
git checkout -b project/alice/iot-dashboard
```

## Keeping Your Branch Updated

When other branches are merged to `main` while you're working, you need to update your branch.

**We use rebase to maintain linear history** (not merge).

### Why Rebase?

- ✓ Keeps commit history linear and clean
- ✓ Avoids unnecessary merge commits
- ✓ Aligns with our "Require linear history" branch protection rule
- ✗ Don't use merge (creates extra merge commit nodes)

### How to Sync Your Branch

```bash
# 1. Fetch the latest changes from main
git fetch origin

# 2. Rebase your branch on top of main
git checkout feat/your-feature
git rebase origin/main

# 3. Resolve conflicts if any
# Edit conflicting files, then:
git add .
git rebase --continue

# 4. Force push to update your PR
git push --force-with-lease
```

**Important:**
- Always use `--force-with-lease` instead of `--force` (safer)
- Only rebase branches that haven't been merged yet
- If multiple people work on the same branch, coordinate before rebasing

### Visual Example

Before rebase:
```
main:       A---B---C---H (another feature merged)
                  \
your-feat:         D---E---F
```

After rebase:
```
main:       A---B---C---H
                         \
your-feat:                D'---E'---F' (rebased on H)
```

## Pull Request Process

### Before Creating a PR

1. Ensure your branch is up-to-date with `main`
2. Run tests locally
3. Review your own changes first

### PR Requirements

- [ ] PR title follows the format: `[Type] Brief description`
  - Examples: `[Feat] Add dark mode toggle`, `[Fix] Resolve navbar overflow`
- [ ] Description clearly explains what and why
- [ ] All tests pass
- [ ] Branch is up-to-date with `main`
- [ ] At least 1 approval required

### PR Template

Use the provided PR template (`.github/pull_request_template.md`) which includes:
- Change summary
- Type of change
- Testing checklist
- Related issues

## Code Review Guidelines

### As a Reviewer

- Be constructive and respectful
- Focus on code quality, not personal preferences
- Approve only when you'd be comfortable maintaining the code
- Check for:
  - Functionality and correctness
  - Code clarity and maintainability
  - Test coverage
  - Documentation updates

### As an Author

- Respond to all comments
- Don't take feedback personally
- Ask questions if feedback is unclear
- Update your PR based on feedback

## Branch Protection Rules

Our `main` branch is protected with these rules:

- ✓ Require pull request before merging
- ✓ Require 1 approval
- ✓ Dismiss stale reviews when new commits are pushed
- ✓ Require status checks to pass
- ✓ Require branches to be up-to-date
- ✓ Require linear history
- ✓ Automatically delete head branches after merge

## Questions?

If you have questions about the workflow, please:
- Check this guide first
- Ask in your PR comments
- Open a discussion issue

Thank you for contributing to MCLab!
