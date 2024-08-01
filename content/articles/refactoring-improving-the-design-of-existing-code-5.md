---
title: "Refactoring: Improving the Design of Existing Code - Ch7"
description: "Encapsulation"
published: 2024/06/19
slug: "refactoring-improving-the-design-of-existing-code-5"
category: "Software Development"
---

###  Introduction

Perhaps the most important criterion in decomposing modules is to identify the secrets that modules should hide from the rest of the system. The most common secrets are data structures, which can be hidden through encapsulation.

### [Encapsulate Record](https://refactoring.com/catalog/encapsulateRecord.html)

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


### [Replace Primitive with Object](https://refactoring.com/catalog/replacePrimitiveWithObject.html)

#### Motivation
In the early stages of development, developers need to decide how to display simple data items like phone numbers. Initially, these may just be strings, but as development progresses, there might be a need for special formatting, such as extracting the country code. This can lead to repetitive code. To manage this, it's helpful to use classes to encapsulate the data presentation logic.

#### Mechanics
1. Encapsulate Variable: Wrap the data using the Encapsulate Variable method.
2. Create a Simple Class: Create a simple class where the data is passed into the constructor and provide a getter to access the data.
3. Run Static Checks: Perform static checks on the code.
4. Modify Getter: Change the getter to return a new instance of the class.
5. Review Naming: Ensure the names are appropriate.
6. Determine Object Representation: Decide if the new object should be represented by reference or value. Use "[Change Value to Reference](https://refactoring.com/catalog/changeValueToReference.html)" if other properties will change with different contexts; otherwise, use "[Change Reference to Value](https://refactoring.com/catalog/changeReferenceToValue.html)".


### [Replace Temp with Query](https://refactoring.com/catalog/replaceTempWithQuery.html)

#### Motivation
When some temporary variables are used only once for calculations and are read-only, storing them as variables can be convenient. However, when the calculations become complex, extracting them into functions can avoid repetition, and the function names can help clarify the code's logic.

````js
// Example in this section
// original class Order
constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
  
  get price() {
    var basePrice = this._quantity * this._item.price;
    var discountFactor = 0.98;
    if (basePrice > 1000) discountFactor -= 0.03;
    return basePrice * discountFactor;
  }
}

// getting basePrice
get price() {
  const basePrice = this.basePrice;
  var discountFactor = 0.98;
  if (basePrice > 1000) discountFactor -= 0.03;
  return basePrice * discountFactor;
  }

 get basePrice() {
   return this._quantity * this._item.price;
 }

// getting discountFactor
 get discountFactor() {
   var discountFactor = 0.98;
   if (this.basePrice > 1000) discountFactor -= 0.03;
   return discountFactor;
 }

 // replace
 get price() {
  return this.basePrice * this.discountFactor;
}
````

#### Mechanics
1. Confirm that the variable's value does not change before and after its usage.
2. If the variable is not read-only but can be made read-only, do it.
3. Test.
4. Extract the variable's assignment into a newly created function.
5. Test.
6. Use the inline variable method to replace the temporary variable.



### [Extract Class](https://refactoring.com/catalog/extractClass.html)

#### Motivation
When a class becomes too complex and difficult to maintain, you can use Extract Class to give each class a single responsibility. Here are other signs that indicate you might need to use Extract Class:

1. Data and Method Association: When certain data and methods are frequently used together.
2. High Dependency Between Data: When there is a high level of dependency between different pieces of data.
3. Subtype Specific Functionality: When a subtype is closely related to a specific part of the functionality, consider extracting it out.

#### Mechanics

1. Consider how to divide responsibilities into new classes:
2. Create a Subclass and Assign Responsibilities: If this causes the parent class's name to no longer match its responsibilities, rename it.
3. Create an Instance of the Subclass in the Parent Class: Use Move Field to transfer fields to the subclass.
4. Use Move Function: Replace method names with those in the new class.
5. Review Parent and Subclass: Remove unnecessary methods and rename them appropriately.
6. Decide If Further Subdivision Is Needed: Determine if you need to create additional subclasses.



### [Inline Class](https://refactoring.com/catalog/inlineClass.html)

#### Motivation
nline Class is the inverse of Extract Class. When a class's functionality is relatively simple, or when you need to move two classes during the refactoring process, you can first use Inline Class to merge them. After that, you can extract them again if necessary.

#### Mechanics
1. Create all functions from the source class in the target class.
2. Transfer the associations from the source class and replace them with the new functions.
3. Delete the source class.



### [Hide Delegeate](https://refactoring.com/catalog/hideDelegate.html)

#### Motivation
Encapsulation means revealing less information between modules. If a client code method is defined on an object within a server object, it means the client must have knowledge of this delegate object. If the delegate object needs to be updated, this update will propagate throughout the client. To prevent this, you can use a delegate method to replace the object. Any updates can then be handled within the delegate method, without affecting the client's references.

#### Mechanics
1. Create a delegate method in the server.
2. Adjust the client's calls and test.
3. If the client no longer references the delegate, delete it.