import { authenticatedFetch } from "@shopify/app-bridge/utilities";
import { createApp, ClientApplication } from "@shopify/app-bridge";
import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";

export function useAuthenticatedFetch(): Function {
  const app = useAppBridge();
  const appBridge = createApp({
    apiKey: app.config.apiKey,
    host: app.config.host ?? "",
  });

  const fetchFunction = authenticatedFetch(appBridge);

  return async (uri: string, options: RequestInit | undefined) => {
    const response = await fetchFunction(
      `https://${process.env.SHOPIFY_APP_ORIGIN}/api${uri}`,
      options
    );
    checkHeadersForReauthorization(response.headers, appBridge);
    return response;
  };
}

function checkHeadersForReauthorization(
  headers: Headers,
  app: ClientApplication
) {
  if (headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1") {
    const authUrlHeader =
      headers.get("X-Shopify-API-Request-Failure-Reauthorize-Url") ||
      `/api/auth`;

    const redirect = Redirect.create(app);
    redirect.dispatch(
      Redirect.Action.REMOTE,
      authUrlHeader.startsWith("/")
        ? `https://${window.location.host}${authUrlHeader}`
        : authUrlHeader
    );
  }
}
