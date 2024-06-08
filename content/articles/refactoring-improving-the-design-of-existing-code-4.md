---
title: "Refactoring: Improving the Design of Existing Code - Ch6"
description: "A First Set of Refactorings"
published: 2024/05/11
slug: "refactoring-improving-the-design-of-existing-code-4"
category: "Software Development"
---

###  Introduction

This chapter is starting to introduce some common refactoring with motivations and mechanics that helps us to recognize the possible situations where could be used.

### [Extract Function](https://refactoring.com/catalog/extractFunction.html)

#### Motivation
Some guidelines suggest that functions shouldn't be longer than one screen, while others say that if code is repeated, it should be extracted into its own function. If it's only used once, let it stay where it is. The purpose of these guidelines is to separate different intentions and operations.

If you need to spend effort understanding what a piece of code does, you should extract it and give it a clear, descriptive name. This way, future development won't require re-checking that piece of code. For the author, if a piece of code is longer than six lines, it often indicates that it might need to be looked at more carefully.

Regarding performance, optimized compilers usually perform better with shorter functions. So, typically, extracting functions doesn't need to worry about performance issues.

#### Mechanics
1. Naming: Name the extracted function. If you can't think of a good name, it might be a signal that it doesn't need to be extracted. It's okay if you can't think of the perfect name right away; you can always merge it back if it doesn't fit. If the language supports nested functions, this can help manage variables in different scopes.

2. Extract the content: Take out the part of the code you want to put into a new function.

3. Check variable scope: If a variable is only used inside the function but is declared in the outer scope, move it inside the function.

4. Compile: After handling all the parameters, compile the code to check for errors and ensure all parameters are properly dealt with.

5. Replace the original code: Replace the original code segment with a call to the new function.

6. Test: Test the code to make sure everything works correctly.

7. Consider similar code: Look for other similar pieces of code that might also benefit from being replaced with a function call.


### [Inline Function](https://refactoring.com/catalog/inlineFunction.html)

#### Motivation
Extract Function and Inline Function are the opposite of each other. For some functions that are too short or too simple, consider using inline to make the code cleaner and remove unnecessary functions.

#### Mechanics
1. Make sure the function isn’t part of a polymorphic method. If it’s in a class and has subclasses that override it, using inline might break its behavior.
2. Find all the places that call the function and replace them.
3. Test.
4. Remove the original function’s declaration.