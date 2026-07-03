import { onRequestPost as __api_enquiry_js_onRequestPost } from "/Users/vikasyewle/Documents/vtpbluewaters/functions/api/enquiry.js"
import { onRequest as ___middleware_js_onRequest } from "/Users/vikasyewle/Documents/vtpbluewaters/functions/_middleware.js"

export const routes = [
    {
      routePath: "/api/enquiry",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_enquiry_js_onRequestPost],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]