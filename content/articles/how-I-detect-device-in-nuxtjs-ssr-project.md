---
title: "How I detect device in Nuxt.js SSR Project"
description: "Enable device detection in a SSR Project"
published: 2024/01/19
slug: "how-I-detect-device-in-nuxtjs-ssr-project"
category: "Nuxt"
---
## Preface
With everyone carrying a mobile device these days, it is now a must for projects to have layouts that work well on both PC and mobile devices. How do we implement device detection and render relative components?

While numerous plugins like useMediaQuery from vueuse and mobile-detect from npm offer device detection capabilities, I'd like to share my approach using the `$device` variables from Nuxt.js modules.

## Installation

The [Nuxt.js official website](https://nuxt.com/modules/device) shows how to install and implement the `$device` variable:

```` bash
yarn add --dev @nuxtjs/device
# Using npm
npm install -D @nuxtjs/device
````

Add it to the modules section of your nuxt.config:

````js
{
  modules: [
   '@nuxtjs/device',
  ]
}
````

The `$device` variable offers various flags for browser and operating system detection, including the userAgent flag.

````js
$device.isDesktop
$device.isMobile
$device.isTablet
$device.isMobileOrTablet
$device.isDesktopOrTablet
$device.isIos
$device.isWindows
$device.isMacOS
$device.isApple
$device.isAndroid
$device.isFirefox
$device.isEdge
$device.isChrome
$device.isSafari
$device.isSamsung
$device.isCrawler
````

You could find detailed information [here](https://nuxt.com/modules/device#usage)

## My Approach

My goal is to establish device detection than seamlessly redirects users to device-specific pages and layouts, ensuring an optimal experience before they even access any content. Here is my folder structure:

````bash
-layouts
 -default.vue
 -mobile.vue
-pages
 -FirstPage
  -index.vue
 -m // for mobile device
  -FisrtPage
   -index.vue
````

To setup all the needs, I added a device.global.ts file to the middleware folder.

````ts
export default defineNuxtRouteMiddleware((to, from) => {
    // device detection
    const device = useDevice();
    if(device.isMobile) {
        to.meta.layout = 'mobile'
        if(!to.path.includes('/m')) {
            if(to.path === '/') {
                return navigateTo(`${to.path}m`)
            } else {
                return navigateTo(`/m${to.path}`)
            }
            
        }
    } else {
        to.meta.layout = 'default'
        if(to.path.includes('/m')) {
            return navigateTo(`${to.path.replace('/m', '')}`)
        }
        
    }
})
````

After the detection, if the device is mobile, the corresponding layout is set using `to.meta.layout` and then redirect.

If you only want to detect devices on certain pages, the official website offers a clear usage example.

````js
export default {
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'default'
}
````

Here is a simple explanation of how to detect the device and set the corresponding layout and pages. Please let me know if you have any comments or suggestions!
