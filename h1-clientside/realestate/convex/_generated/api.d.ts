/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as clients from "../clients.js";
import type * as contracts from "../contracts.js";
import type * as dashboard from "../dashboard.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as properties from "../properties.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  clients: typeof clients;
  contracts: typeof contracts;
  dashboard: typeof dashboard;
  files: typeof files;
  http: typeof http;
  properties: typeof properties;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
