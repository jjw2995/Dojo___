if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/P-We-QixxePrgctfny1Nd/_buildManifest.js",revision:"3ba319738a77f5d501e267ee77fa6374"},{url:"/_next/static/P-We-QixxePrgctfny1Nd/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0b7b90cd.307e31d832b02524.js",revision:"307e31d832b02524"},{url:"/_next/static/chunks/158-92e3a64e917e4a53.js",revision:"92e3a64e917e4a53"},{url:"/_next/static/chunks/340.7f3946d9780b777a.js",revision:"7f3946d9780b777a"},{url:"/_next/static/chunks/424-954090083e948350.js",revision:"954090083e948350"},{url:"/_next/static/chunks/588-f3732ca52faa9fa4.js",revision:"f3732ca52faa9fa4"},{url:"/_next/static/chunks/603-ce5cbc4c349e0977.js",revision:"ce5cbc4c349e0977"},{url:"/_next/static/chunks/c16184b3-6dc661f01e6fb400.js",revision:"6dc661f01e6fb400"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-7d4ca12076f15c5e.js",revision:"7d4ca12076f15c5e"},{url:"/_next/static/chunks/pages/_app-4116819d52536436.js",revision:"4116819d52536436"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/bistro-803aa787b7fcad4c.js",revision:"803aa787b7fcad4c"},{url:"/_next/static/chunks/pages/bistro/%5BbistroId%5D/home-5245d17a48da0211.js",revision:"5245d17a48da0211"},{url:"/_next/static/chunks/pages/bistro/%5BbistroId%5D/invite-dc9bdbce1d1b123e.js",revision:"dc9bdbce1d1b123e"},{url:"/_next/static/chunks/pages/bistro/%5BbistroId%5D/menu-31d07c9b796d9884.js",revision:"31d07c9b796d9884"},{url:"/_next/static/chunks/pages/bistro/%5BbistroId%5D/pay-19d7e217ebba4952.js",revision:"19d7e217ebba4952"},{url:"/_next/static/chunks/pages/index-c30b0d899371af28.js",revision:"c30b0d899371af28"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-0fe3ec20ffed7c7c.js",revision:"0fe3ec20ffed7c7c"},{url:"/_next/static/css/350afeaa89af6dcb.css",revision:"350afeaa89af6dcb"},{url:"/_next/static/css/fc1c9daac70c093b.css",revision:"fc1c9daac70c093b"},{url:"/_next/static/media/layers-2x.9859cd12.png",revision:"9859cd12"},{url:"/_next/static/media/layers.ef6db872.png",revision:"ef6db872"},{url:"/_next/static/media/marker-icon.d577052a.png",revision:"d577052a"},{url:"/favicon.ico",revision:"0809538b59d857dc43ccc216d342c3a4"},{url:"/icon-192x192.png",revision:"735b97cbaaeae256503913a0a435f063"},{url:"/icon-256x256.png",revision:"e576d706364c76f5541d0e7c81169209"},{url:"/icon-384x384.png",revision:"43539d2eadb5039ba4c7a52bdc097dfa"},{url:"/icon-512x512.png",revision:"b097795cac34ba2ac4890bdfaf00aa5f"},{url:"/images/layers-2x.png",revision:"4f0283c6ce28e888000e978e537a6a56"},{url:"/images/layers.png",revision:"a6137456ed160d7606981aa57c559898"},{url:"/images/marker-icon-2x.png",revision:"401d815dc206b8dc1b17cd0e37695975"},{url:"/images/marker-icon.png",revision:"2273e3d8ad9264b7daa5bdbf8e6b47f8"},{url:"/images/marker-shadow.png",revision:"44a526eed258222515aa21eaffd14a96"},{url:"/manifest.json",revision:"17d3ae7c97c8d3e86244b8d84bf77ef6"},{url:"/sw.js",revision:"8b9bd3abef0b653c0e9edc3b49db6acc"},{url:"/sw.js.map",revision:"deb8bac13f050a05f352de4611cdfa20"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));