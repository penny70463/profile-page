---
title: "Refactoring: Improving the Design of Existing Code - Ch3"
description: "Bad Smells in Code"
published: 2024/03/18
slug: "refactoring-improving-the-design-of-existing-code-2"
category: "Software Development"
---

###  Introduction
There's no set of guidelines that can compare to human intuition. Here are some suggestions for when you're unsure how to refactor, and then it's up to you to define what you're looking for.

#### Mysterious Name
People are often afraid to rename things, thinking it’s not worth the trouble, but a good name can save hours of puzzled incomprehension in the future.

#### Duplicated Code
When you see the same code more than once, it's usually better to unify it to avoid having to compare them later for any differences.

#### Long Function
Short code is more usable than long code. Longer code can be shortened by using [Extract Function](https://refactoring.guru/extract-method). You can often use [Replace Temp with Query](https://refactoring.guru/replace-temp-with-query) to eliminate the temps. Long lists of parameters can be slimmed down with [Introduce Parameter Object](https://refactoring.com/catalog/introduceParameterObject.html) and [Preserve Whole Object](https://refactoring.com/catalog/preserveWholeObject.html)."

#### Global Data
The drawback of global data is that it can be modified from anywhere, making it difficult to trace the source of modifications and leading to hard-to-predict bugs. We can control variable modifications by [Encapsulate Variable](https://refactoring.com/catalog/encapsulateVariable.html).

#### Mutable Data
A healthy code segment should always produce the same output for the same input, making it easier to identify bugs during testing. This is one of the benefits of immutable data. We can use [Encapsulate Variable](https://refactoring.com/catalog/encapsulateVariable.html) to track each data update, and [Split Variable](https://refactoring.com/catalog/splitVariable.html) to distinguish between operations with different meanings and avoid risky updates. By using [Slide Statements](https://refactoring.com/catalog/slideStatements.html) and [Extract Function](https://refactoring.com/catalog/extractFunction.html), we can limit the scope of data updates and avoid unnecessary side effects.

#### Divergent Change
When a class needs to be modified for different reasons, such as to support new data formats, add new features, or fix existing bugs, these changes may be scattered across various parts of the class. This not only increases the difficulty of understanding and maintaining the code but also makes it easier to introduce errors. Use [Split Phase](https://refactoring.com/catalog/splitPhase.html) to follow the Single Responsibility Principle.

#### Shotgun Surgery
Shotgun surgery is similar to divergent change but the opposite. When you need to make a change and have to modify many places, it's easy to miss something. To fix this, you can use [Move Function](https://refactoring.com/catalog/moveFunction.html) and [Move Field](https://refactoring.com/catalog/moveField.html) to gather all changes into a single module. If you have many functions working on similar data, use [Combine Functions into Class](https://refactoring.com/catalog/combineFunctionsIntoClass.html).

#### Feature Envy
When one class (the dependent class) relies heavily on another class (the depended-upon class) to perform its core functionality. This results in tight coupling between the two classes, making the code difficult to understand, maintain, and extend. We should prevennt to use or access method and private data from the depended class directly. Follow the Single Responsibility Principle and reduce coupling between classes. In software design, a fundamental principle is to group data and behavior that change together. But there are exceptions, the key principle to deal with various methods is to encapsulate the varying behavior and separate them from the core logic. This promotes loose coupling, flexibility, and extensibility in the design.

#### Data Clumps
Data items should be grouped together rather than scattered throughout the code. Utilize [Extract Class](https://refactoring.com/catalog/extractClass.html) to categorize them and employ [Introduce Parameter Object](https://refactoring.com/catalog/introduceParameterObject.html) or [Preserve Whole Object](https://refactoring.com/catalog/preserveWholeObject.html) to streamline parameter passing.

#### Primitive Obsession
Primitive Obsession refers to the excessive use of primitive data types to represent domain objects or concepts in software design. This often leads to code that is difficult to understand, maintain, and extend. To address Primitive Obsession, Fowler advocates for the creation of dedicated types that encapsulate the relevant data and behavior associated with a particular domain concept. To my understanding, implementing Interfaces and Types in TypeScript or Functions and Classes are common way to avoid Primitive Obsession and also align to DDD(Domain-Driven Design) Principle.

#### Repeated Switches
Using polymorphism instead of using repeated switches to against the dark force of repetition. I cannot fully comprehend the drawbacks of switch statements yet. Perhaps with more experience, I'll gain a better understanding of the downsides of using switch.

#### Loops
Using Pipeline instead of using loops helps us to understand the code intuitively.

#### Lazy Element
Lazy Element refers to a program element that does not do enough to justify its existence. This means that the element, such as a method, variable, or class, provides minimal value or functionality compared to its complexity or impact on the codebase. Use [Inline Function](https://refactoring.com/catalog/inlineFunction.html) and [Inline Class](https://refactoring.com/catalog/inlineClass.html) to eliminate the unnecessary element and simplifies the code.

#### Speculative Generality
In refactoring, Speculative Generality aligns with the YAGNI(You Aren't Going to Need It) principle(mentioned in Ch2). When a class or function is solely used by a single user or feature, it's time to remove it.

#### Temporary Field
Some classes or variables only appear in certain circumstances, making the code confusing. We can reduce these temporary fields by implementing [Extract Class](https://refactoring.com/catalog/extractClass.html) and [Move Function](https://refactoring.com/catalog/moveFunction.html) techniques. Pipelines can also be helpful in many situations.

#### Message Chains

````js
// Before refactoring
const city = order.customer.address.city;

// After refactoring
class Order {
  getCustomerCity() {
    return this.customer.getCity();
  }
}

class Customer {
  getCity() {
    return this.address.city;
  }
}

const city = order.getCustomerCity();
````
Like the code above, we can introduce intermediary methods or delegate methods to break the chain of calls, so that each object only needs to know about its direct properties or methods, without needing to understand the entire chain structure. 

#### Middle Man
The code above shows that the classes act as middlemen, which reduce the coupling of the structure. However, overusing middlemen could cause performance issues. Therefore, it's important to review and remove unnecessary or unused classes.

#### Insider Trading
#### Large Class
#### Alternative Classes with Different Interfaces
#### Data Class
#### Refused Bequest
#### Comments
