---
title: "Refactoring: Improving the Design of Existing Code - Ch7"
description: "Encapsultion"
published: 2024/06/19
slug: "refactoring-improving-the-design-of-existing-code-5"
category: "Software Development"
---

###  Introduction

Perhaps the most important criterion in decomposing modules is to identify the secrets that modules should hide from the rest of the system. The most common secrets are data structures, which can be hidden through encapsulation.

### [Encapsulte Record](https://refactoring.com/catalog/encapsulateRecord.html)

#### Motivation
The difference between records and objects is that records are suitable for static or immutable data because it is difficult to control modifications to the data. Objects, on the other hand, manage data access and modifications through the encapsulation provided by setters and getters.

#### Mechanics
1. Apply the "Encapsulate Variable" method to the variable holding the record.
2. Create a class that wraps the record.
3. Define an accessor in the class to return the raw record.
4. Modify the functions that encapsulate the variable to use this accessor.
5. Test the modifications.


### [Encapsulte Collection](https://refactoring.com/catalog/encapsulateCollection.html)

#### Motivation
When encapsulating a collection, directly returning the collection from a getter allows changes to the collection's contents without the class's control. To prevent this, avoid returning the actual collection. However, having individual methods for each field in the collection can lead to redundant code. The author suggests combining these operations into a collection pipeline (like map, filter, reduce in JavaScript) or returning a copy of the collection (using slice or spread).

#### Mechanics
1. Apply the "Encapsulate Variable" method to the variable.
2. Remove the setter function, or make the setter take a copy of the provided collection.
3. Run static checks (e.g., using Lint or a Code Analyzer) to confirm the syntax.
4. Identify all references to the collection and update their modifiers.
5. Test the changes.