---
title: "Refactoring: Improving the Design of Existing Code - Ch4 & Ch5"
description: "Building Tests and Introducing the Catalog"
published: 2024/04/16
slug: "refactoring-improving-the-design-of-existing-code-3"
category: "Software Development"
---

###  Building Tests

Refactoring and the accompanying tests are valuable tools that can reveal unexpected errors. Writing code often involves a lot of debugging, and having tests can make this process more efficient. When you finish developing a piece of code, writing tests right away can help you catch and fix errors while the code is still fresh in your mind. Additionally, writing tests before developing a new feature can help you think through how to implement it effectively.

"I write the tests as I go when I develop code."

Consider a simple user interface that calculates the quantity and cost of goods provided by a specific region and its producers. We can illustrate this with two classes: Province and Producer. We'll test for correct shortfall calculations, total production, and profit, among other things.

Here is an example of how you might structure tests using Mocha for the Province and Producer classes:

````js
const assert = require('assert');
const Province = require('./Province');
const Producer = require('./Producer');

describe('Province', function() {
  let asia;

  beforeEach(function() {
    asia = new Province('Asia', [
      new Producer('Byzantium', 10),
      new Producer('Attalia', 12),
      new Producer('Sinope', 10)
    ], 30);
  });

  it('shortfall', function() {
    assert.strictEqual(asia.shortfall, 5);
  });

  it('total production', function() {
    assert.strictEqual(asia.totalProduction, 32);
  });

  it('profit', function() {
    assert.strictEqual(asia.profit, 230);
  });

  describe('boundary conditions', function() {
    it('no producers', function() {
      const noProducers = new Province('No Producers', [], 30);
      assert.strictEqual(noProducers.shortfall, 30);
      assert.strictEqual(noProducers.totalProduction, 0);
    });

    it('negative demand', function() {
      asia.demand = -1;
      assert.strictEqual(asia.shortfall, -1);
      assert.strictEqual(asia.profit, 0);
    });

    it('empty string demand', function() {
      asia.demand = '';
      assert.strictEqual(asia.shortfall, NaN);
      assert.strictEqual(asia.profit, NaN);
    });
  });
});

````

Using Mocha, we can write tests and break the code into multiple blocks, each containing:

1. The data or objects being tested.
2. Assertions.
Here are some guidelines for testing:

Run tests frequently, even if they are not complete, and don't wait for them to be perfect.
Design comprehensive scenarios.
Ensure that tests do not change the original state of the code.
Test boundary conditions to reveal how the code behaves in extreme situations, ensuring stability and reliability.
Testing, like code development, is an iterative process. It's rare to write the perfect test on the first try, and you'll likely need to refine your tests over time.

How do you know if your tests are enough? Coverage metrics show which parts of the code are untested but don't measure quality. Determining whether tests are good enough is subjective; the goal of writing tests is to provide confidence that any errors introduced by developers will be detected.

What about over-testing? This happens when you spend more time rewriting tests than writing code, though it's much rarer than under-testing.


### Introducing the Catalog