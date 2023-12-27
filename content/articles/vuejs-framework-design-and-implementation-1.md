---
title: "I read Vue. JS Framework Design and Implementation part1 - The Overview of Framework Design"
description: "A beginner-friendly guide to overview framework design"
published: 2023/12/21
slug: "vuejs-framework-design-and-implementation-1"
---

<!-- > This article was created using ChatGPT and meant as a placeholder -->
This series of articles is a personal reading record of the book [Vue. JS Framework Design and Implementation](https://link.springer.com/book/10.1007/978-981-99-4947-2). This series dives into six key aspects: 
 [- The Overview of Framework Design]

 [- Reactivity System]

 [- Render]

 [- Modularization]

 [- Compiler]

 [- Server Side Rendering]
 

We're starting with the first one: The overview of framework design.

##  The Art of Trade Off
###  Imperative Programming and Declarative Programming

To distinguish between these two styles, they could be regarded as "How to do" and "What to do," namely, imperative programming tells the computer how to do something step by step, while declarative programming focuses on what to do, leaving the details of how to do it to the computer. Imperative programming is as follows:

```js
const div = document.querySelector('#app') // access div
div.innerText = 'hello world' // set text content
div.addEventListener('click', () => { alert('ok') }) // listen to 'click' event
```

Declarative programming:

```js
<div @click="() => alert('ok')">hello world</div>
```

This HTML-like template is how Vue.js implements the above function. Vue.js encapsulates the imperative process and presents the declarative part to developers, making it easier to write and maintain code.

### The Trade off Between Performance and Maintainability 

The performance of declarative programming will never faster than imperative one. Why? Let's assume A is the performance overhead of imperative programming.

```js
div.textContent = 'hello vue3' // modify the content directly, the performance overhead is A
```

Let's define B as the performance overhead of finding the difference.

```js
// before
<div @click="() => alert('ok')">hello world</div>

// after
<div @click="() => alert('ok')">hello vue3</div>

// the performance overhead of declarative programming is A + B
```
We could see the best case of declarative programming, which is to minimize "B" as much as possible. So why not use imperative programming for best performance? That's because the maintainability and readability of declarative programming, this allows developers to focus on functionality building.


### Comparison of DOM and Virtual DOM Performance

```js
const html = `
<div><span>...</span></div>
`
div.innerHTML = html
```
To render a page, you first need to parse the string into a DOM tree. We konw that operations involving DOM manipulation are often less performant than operations involving pure JavaScript object. Let's compare the performance between using innerHTML and virtual DOM for creating and updating all DOM elements.

For using innerHTML, the steps include parsing the entire string into a DOM tree and creating all DOM elements from scratch. For virtual DOM, the steps include creating JavaScript objects representing virtual DOM nodes (VNodes) and then using a diffing algorithm to determine the minimal set of changes needed to update the actual DOM. Up to this point, the performance of these two approaches is relatively similar. 

When it comes to updating DOM elements, using innerHTML requires re-parsing the entire string, destroying the old DOM tree and creating a new one from scratch. In contrast, virtual DOM only requires creating a new set of VNodes, comparing them to the previous set, and updating only the necessary parts of the actual DOM.


## Core Elements of Framework Design

There are some issues should be considered as developing a framework, such as the product for different environment, error messages with clarity for better development experience, customized features...

### Development Experience Is A Key Metric of Evaluating A Framework

While providing comprehensive warning message is essential for efficient problem idetification, it can also increase framework size. Tree shaking helps mitigate this by removing unused code, ensuring a balance of developing guidance and framework footprint.


### Error Handling

Error handling is also critical which determine the verbosity of a framework directly. To illustrate the significance of error handling, the author provides this example:

````js
// utils.js
 export default {
 foo(fn) {
 fn && fn()
   }
 }

````
This module exports an object with a property named foo which takes a callback function as an argument. When the foo function is called, the callback function is executed. 

````js
 import utils from 'utils.js'
 utils.foo(() => {
 // ...
 })

````

How to handle error when something is going wrong while executing the callback function ? While implementing error handling within callback functions is one approach, it can introduce code duplication, raising concerns about maintainability.

````js
 import utils from 'utils.js'
 utils.foo(() => {
 try {
 // ...
 } catch (e) {
 // ...
 }
 })

````

A second strategy for managing errors involves encapsulating error-handling logic within a dedicated function.

````js
 // utils.js
 export default {
 foo(fn) {
  callWithErrorHandling(fn)
  },
 bar(fn) {
  callWithErrorHandling(fn)
  },
 }

 function callWithErrorHandling(fn) {
 try {
  fn && fn()
  } catch (e) {
  console.log(e)
  }
 }
````

While encapsulation enhances code clarity, its most significant contribution lies in establishing an unified interface for error handling, providing consistency and maintainability.

### Feature Switches

Vue.js offers feature switches to enhance flexibility and customization. For instance, while the Options API remains compatible in Vue 3, the Composition API is recommended for most use cases, and the Options API can be disabled when not required which could be eliminated by tree shaking to reduce bundle sizes.

````js
{
 __FEATURE_OPTIONS_API__: isBundlerESMBuild ?
`__VUE_OPTIONS_API__` : true,
}

````

This switch mode is also addressed to distinguishes between development and production environment, activating distinct bundlers optimized for their respective needs.

````js
if (__DEV__) {
 warn(`useCssModule() is not supported in the global build.`)
 }

````
## Design pattern of Vue.js 3

### Declarative UI description

Frontend Programming involves DOM elements, properties, events and element hierachy. 
For Vue.js 3, it uses the same HTML tag to represent a DOM element.

````html
 <div></div>
````
Vue.js 3 also use the same HTML tag to represent DOM element properties.
  
````html
 <div id="app"></div>；
````

Using v-bind for dynamic properties.

````html
<div :id="dynamicId"></div>
````

Using '@' or v-on for describing events.

````html
<div @click="handler"></div>
````

Using the same HTML tag for describing element hierachy.

````html
<div><span></span></div>
````

As you can see, developers don't need to implement imperative programming event for events. This is called `Declarative UI description`.
Except for template mode above, developers also could implement JavaScript objects.

````js
const title = {
 // tag name
 tag: 'h1',
 // props
 props: {
 onClick: handler
 },
 // child nodes
 children: [
 { tag: 'span' }
 ]
}

````

Which represent as:

````html
<h1 @click="handler"><span></span></h1>
````

So, what's the key difference between using templates and JavaScript objects? It's flexibility.

For example, when implementing HTML h1~h6 tag based on various titles, JavaScript objects offers a more adaptable approach.

````js
// level of h tag
 let level = 3
 const title = {
 tag: `h${level}`, // h3 标签
}
````

For templates, we can't avoid to enumerate all the possibilities.
````html
<h1 v-if="level === 1"></h1>
<h2 v-else-if="level === 2"></h2>
<h3 v-else-if="level === 3"></h3>
<h4 v-else-if="level === 4"></h4>
<h5 v-else-if="level === 5"></h5>
<h6 v-else-if="level === 6"></h6>
````
The approach of using JavaScript objects for UI description here, is so called virtual DOM. 
Here is how we achieve UI description in Vue.js 3.

```` js
import { h } from 'vue'

export default {
 render() {
 return h('h1', { onClick: handler }) // virtual DOM
 }
}
````

The h function returns an object which allows the convenience for implementing virtual DOM. The code above is the same to:

````js
export default {
 render() {
  return {
   tag: 'h1',
   props: { onClick: handler }
  }
 }
}

````

It's worth explaining what a render function is. The content to be rendered by a component is described in a render function, which is the render function in the code above. Vue.js wiil use the return value of the component's render function to create a virtual DOM, and then it will render the component's content.


### Introduction to Renderer

Now we know that virtual DOM is a lightweight representation of actual DOM. The role of the renderer is to render the virtual DOM to the actual DOM. Assume we have virtual DOM as follows:

````js
const vnode = {
 tag: 'div',
 props: {
 onClick: () => alert('hello')
 },
 children: 'click me'
}
````

So we have a `<div></div>` tag which has a property as a click event, the text on its children is 'click me'. 
Next, let's write a renderer to render the virtual DOM above to the actual DOM.

````js
// the first argument 'vnode' represents the virtaul DOM, 
// container represents an actual DOM is a mount point.
function renderer(vnode, container) {
// create DOM element by vode.tag
 const el = document.createElement(vnode.tag)
// traverse vnode.props and add properties and event to the DOM element
 for (const key in vnode.props) {
   if (/^on/.test(key)) {
// define events if the key starts with "on"
    el.addEventListener(
      key.substr(2).toLowerCase(), // event name
      vnode.props[key] // event functions
 )
 }
}

// children
 if (typeof vnode.children === 'string') {
// if the type of children is string, the text content is the string
     el.appendChild(document.createTextNode(vnode.children))
 } else if (Array.isArray(vnode.children)) {
// call renderer recursively
 vnode.children.forEach(child => renderer(child, el))
}

// append child
container.appendChild(el)
}

````

The steps of the renderer function above are:

1. Create a DOM element
2. Add properties and events on the DOM element
3. Children: if the children is an array, then call the renderer function recursively.


### The Essence of A Component

A component is a collection of DOM elements that are bundled together. This set of DOM elements is the content to be rendered by the component. We can define a function to represent a component, where the return value is the content to be rendered.

````js
const MyComponent = function () {
 return {
 tag: 'div',
 props: {
 onClick: () => alert('hello')
 },
 children: 'click me'
 }
}

````

The return value of a component is also a virtual DOM, we can store the component function in the tag property of the virtual DOM object.

````js
const vnode = {
 tag: MyComponent
}
````
Modify the renderer function:

````js
function renderer(vnode, container) {
 if (typeof vnode.tag === 'string') {
   // the content is a HTML tag
   mountElement(vnode, container)
  } else if (typeof vnode.tag === 'function') {
   // the content is a component
  mountComponent(vnode, container)
 }
}
````
Mounting the vnode based on the different content.

````js
function mountElement(vnode, container) {
   // create a vnode.tag DOM element
  const el = document.createElement(vnode.tag)
   // traverse vnode.props to add properties and event listener
  for (const key in vnode.props) {
   if (/^on/.test(key)) {
   // the key is an event if it's name start from 'on'
   el.addEventListener(
   key.substr(2).toLowerCase(), // onClick --->click
   vnode.props[key] // event handler
   )
  }
 }

 // for children
 if (typeof vnode.children === 'string') {
  // if children is a string, it's a text content
  el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
  // render the child node by calling renderer recursively and mount on the el element
  vnode.children.forEach(child => renderer(child, el))
 }

 // append the element to the mount point
 container.appendChild(el)
}

````

````js
function mountComponent(vnode, container) {
 // access the content to be rendered by calling component function
 const subtree = vnode.tag()
 renderer(subtree, container)
}

````

A component not is necessarily a function, we can also use a JavaScript object to express a component.

````js
// MyComponent is an object
const MyComponent = {
   render() {
   return {
   tag: 'div',
   props: {
    onClick: () => alert('hello')
    },
    children: 'click me'
  }
 }
}

````

````js
function renderer(vnode, container) {
 if (typeof vnode.tag === 'string') {
   mountElement(vnode, container)
   } else if (typeof vnode.tag === 'object') { 
   // vnode is expressing a component if vnode.tag is an object
   mountComponent(vnode, container)
 }
}
````

````js
function mountComponent(vnode, container) {
   const subtree = vnode.tag.render()
   renderer(subtree, container)
}
````

### The Working Principle of Template

Both using virtual DOM and using template are declarative programming. We have been talking about how virtual DOM to be rendered to an actual DOM, then how does template works? It's compiler.

The compiler acts as a translator, converting the template into a render function that ccna dynamically generate the desired output. Assume we have a template as follows:

````html
<div @click="handler">
click me
</div>
````

The compiler translates this template into:

````js
render() {
 return h('div', { onClick: handler }, 'click me')
}

````

For a vue.js file, it contains `<template>` tag and `<script>` tag. 
````html
<template>
  <div @click="handler">
   click me
  </div>
 </template>
<script>
export default {
   data() {/* ... */},
   methods: {
   handler: () => {/* ... */}
 }
}
</script>
````

The compiler translate the template content to a render function:

````js
export default {
 data() {/* ... */},
  methods: {
  handler: () => {/* ... */}
 },
  render() {
   return h('div', { onClick: handler }, 'click me')
 }
}
````

Whether using a virtual DOM and using a template-based approach, the desired output is ultimately generated by a render function and rendered by a renderer.

### Vue.js Is A Cohesive System Made Up Of Modules

As mentioned before, the implementation of a component depends on a renderer, the compilation of a template depends on a compiler, the generated code is determined by the design of renderer and virtual DOM. Therefore, the modules in Vue.js are interrelative and interdependent, and together them foorm a cohesive system.

Assume we got a template as follows:
````html
<div id="foo" :class="cls"></div>
````

The compiler tranlates the template to a render function:
````js
render() {
// for intuitive, here we shows the virtual DOM object 
// which is equal to:
// return h('div', { id: 'foo', class: cls })
  return {
   tag: 'div',
   props: {
   id: 'foo',
   class: cls
  }
 }
}
````
We know that cls is a dynamic variable and the renderer's search for mutations can be costly in terms of performance. How can we inform the renderer for about the mutation during compilation to optimize its efforts?  

````js
render() {
  return {
   tag: 'div',
   props: {
   id: 'foo',
   class: cls
  },
   patchFlags: 1 // assume 1 means the class is dynamic
 }
}
````

Informing the renderer that class is dynamic through adding a property to a virtual DOM object. This demonstrates that the compiler and renderer communicates with each other, which helps to improve the performance. The virtual DOM object is the medium for this communication.
