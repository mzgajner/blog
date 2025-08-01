---
title: The unexpected merge commit SHA
date: 2025-08-01
---

Quick question - let's say I show you a GitHub API response listing some pull requests. Among other things, the listed objects have a property called `merge_commit_sha` - it's set to `null` on some and it's a valid SHA string on others. What would you assume about those PRs based on that property?

If your answer is that the ones with `merge_commit_sha` set to `null` are not yet merged while the ones with `merge_commit_sha` are merged and the `merge_commit_sha` is a SHA of the merge commit - you're wrong. I assumed that too and caused a bug.

The actual answer is that:
1. PRs that are not yet merged _and have conflicts with their target branch_ have `merge_commit_sha` set to `null`.
2. PRs that are already merged have `merge_commit_sha` set to the SHA of their merge commit.
3. Here's the kicker - PRs that are not yet merged, but _don't have any conflicts with their target branch_ have `merge_commit_sha` set to a SHA of a secret internal commit that GitHub creates behind the scenes to test the mergeability of your branch.

To be fair, they [say so in the documentation](https://docs.github.com/en/rest/pulls/pulls#get-a-pull-request), but it still threw me off.