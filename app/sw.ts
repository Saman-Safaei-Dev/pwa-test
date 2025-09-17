import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { ExpirationPlugin, NetworkFirst, Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({ url: { pathname } }) =>
        pathname === "/" && process.env.NODE_ENV === "production",
      handler: new NetworkFirst({
        cacheName: "home-cache",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 4,
            maxAgeFrom: "last-fetched",
            maxAgeSeconds: 3 * 24 * 60 * 60, // 3 days
          }),
        ],
      }),
    },
    ...defaultCache,
  ],
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: { cleanupOutdatedCaches: true, concurrency: 20 },
});

const urlsToCache = ["/"] as const;

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all(
      urlsToCache.map((entry) => {
        const request = serwist.handleRequest({
          request: new Request(entry),
          event,
        });
        return request;
      }),
    ),
  );
});

serwist.addEventListeners();
