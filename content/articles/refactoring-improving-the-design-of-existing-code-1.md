---
title: "Refactoring: Improving the Design of Existing Code - Ch1 & Ch2"
description: "A First Example and Principles in Refactoring"
published: 2024/02/10
slug: "refactoring-improving-the-design-of-existing-code-1"
category: "Software Development"
---

###  Introduction
This book "Refactoring: Improving the Design of Existing Code" is wrote by Martin Fowler. He started from a simple example to demonstrates step-by-step how to refactor this code to improve it's structure without changing its external behavior. However, before refactoring we must build a robust test flow to prevent any changes of the code's behaviors. 

#### Definition
The most brief definition of refactoring is a change made to the code make it easier to understand and reduce the cost of developing new features without changing the existing behaviors. Besides, we must be aware that developing new features and refactoing are two differnt actions. When we are building new feature, we only focus on the feature with out changing the existing code, while as we are refactoring, we don't change the behaviors of the project.  

#### About Performance
Refactoring is often expected to improve program performance. However, in reality, refactoring doesn't always lead to better performance. The main goal of refactoring is to make the code easier to read and reduce the cost of adding new features. The author suggests that if you encounter performance issues while refactoring, you should complete the refactoring first and then address performance improvements afterward.

#### Small Progress Each Time
Each step in refactoring involves making only small changes. After each change, you should run tests again to ensure that the functionality hasn't changed and that no new bugs have been introduced.

#### Why do we need to refactor?
Refactoring improves software architecture, making it easier to find bugs and enhancing code readability. It boosts productivity, though initially, the impact on productivity might seem minimal. Over time, as the program's structure improves, the cumulative effect will lead to significant productivity gains, especially when developing new features. For a long time, people have thought of software development as a process of continuous growth. However, good developers know that the fastest way to add new features is to make the code easy to extend.

#### When should we refactor?
1. Three Times Rule: The first time you might wonder if you need to refactor. By the third time you feel this way, it's definitely time to refactor. If more urgent features need development, make a note and come back to it later.
2. Keep the Project Ready for New Features: Ensure the codebase is always easy to develop new features in.
When Code is Hard to Understand: If you have to spend extra time understanding what a piece of code does, it's a sign that refactoring is needed.
3. We don't need to set aside special time for refactoring. Instead, treat refactoring as a natural part of the development process, just like developing new features or fixing bugs.

#### When should you not refactor?
1. When no changes are needed: If you don't need to modify the code, even if it's messy, leave it alone. Refactor only when you understand the benefits it will bring.
2. When rewriting is easier than refactoring: If rewriting the code is simpler and more efficient than refactoring, then go for a rewrite instead.

#### Problems Encountered During Refactoring
1. Slower Development of New Features:
Sometimes, the scope of refactoring can become too large, especially when only a small new feature needs to be added. In such cases, it's often better to add the new feature first rather than spending too much time on refactoring.

2. Branches:
The longer a branch exists without being merged into the mainline, the harder it becomes to integrate. Therefore, it’s recommended that teams integrate their changes with the mainline at least once per day to avoid complex merges.

3. Testing:
Comprehensive and complete testing ensures that refactoring does not introduce new bugs or unintended behavior. However, writing tests can be time-consuming and requires significant effort.

4. Database:
While refactoring advocates for making small changes, database changes often need to be done all at once. A suggested approach is to add a new field with the updated name, allow both the old and new fields to coexist temporarily, and gradually transition to using the new field before eventually removing the old one.

5. You Aren't Going to Need It (YAGNI):
Avoid over-engineering; only implement what is needed at the moment. Don’t add features that are not currently required.

