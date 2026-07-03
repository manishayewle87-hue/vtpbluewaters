import { onRequestPost as __api_enquiry_js_onRequestPost } from "/Users/vikasyewle/Documents/vtpbluewaters/functions/api/enquiry.js"

export const routes = [
    {
      routePath: "/api/enquiry",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_enquiry_js_onRequestPost],
    },
  ]