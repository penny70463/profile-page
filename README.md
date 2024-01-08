## Personal Website

[Live URL](https://penny70463.netlify.app)


### Challenges I've faced 

#### Common Issues When Deploying A Nuxt.js Project On Netlify

- [x] npm run build works on local but got this error when deploying

````js
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
````
 [solution works for me](https://answers.netlify.com/t/build-command-javascript-heap-out-of-memory/85348/6)
 
- [x] I got 404 after deployment finished 

 [solution works for me](https://answers.netlify.com/t/netlify-returns-404-for-ssr-nuxt-website/99741/10)

- [x] my avatar got 404
 
 Nuxt Image doesn’t seem to be directly compatible with Netlify, so I used <img /> directly for static directory.

#### Other Issues 

- [x] environment variables

I have failed to access environment variables on Netlify many times. It turns out that I needed to add "NUXT_ENV".
 [solution works for me](https://zain-ahmed-5360.medium.com/how-to-config-env-variables-in-nuxt-js-with-heroku-and-netlify-adfcdde6c6cf)

- [ ] Unchecked runtime.lastError: The message port closed before a response was received.

- [ ] Got "Cross-Origin-Opener-Policy policy would block the window.close call." when logging with Google.

### Features Coming Soon

- [x] Article Categories

- [x] Article Outline

- [x] Message Board

- [ ] Session Storage

### Tech Stack

1. Nuxt JS
2. Tailwind CSS
3. Vue
4. Nuxt Content Module
5. Shiki JS ES
6. Google firebase: firestore, auth

### Installation

1. `git clone` this repo or click on `Use this template` button.
2. `cd` into the project directory.
3. Run `yarn install` to install the dependencies.
4. Run `yarn dev` to start the development server.


