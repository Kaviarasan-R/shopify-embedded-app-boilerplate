import { useAuthenticatedFetch } from "@/hooks/useAuthenticatedFetch";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  BlockStack,
  Button,
  Card,
  InlineStack,
  Layout,
  Link,
  List,
  Page,
  Text,
} from "@shopify/polaris";
import { useState } from "react";

const Index = () => {
  const appBridge = useAppBridge();
  const [isLoading, setIsLoading] = useState(false);
  const authenticatedFetch = useAuthenticatedFetch();

  const handleApiCall = async () => {
    try {
      setIsLoading(true);

      const response = await authenticatedFetch("/gql/get-shop", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 400) {
        const res = await response.json();
        throw new Error(res.message || "Failed to fetch the shop details.");
      }

      await response.json();

      appBridge.toast.show("API health check successful");
    } catch (error) {
      console.error(error);
      appBridge.toast.show(
        "Failed to verify API health. Please check browser console for errors.",
        { isError: true }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <BlockStack gap={"300"}>
            <Card>
              <BlockStack gap={"600"}>
                <Text variant="headingLg" as="h1">
                  Shopify Embedded App Boilerplate
                </Text>
                <Text variant="bodyLg" as="p" alignment="justify">
                  This app is built on a modern monorepo architecture using
                  React.js, NestJS, and Turbo.js. It leverages Shopify's{" "}
                  <strong>@shopify/shopify-app-express</strong> package for
                  seamless Shopify integration and uses Redis for efficient
                  session management with{" "}
                  <strong>@shopify/shopify-app-session-storage-redis</strong>.
                  For more details, see the{" "}
                  <Link
                    url="https://github.com/Shopify/shopify-app-js"
                    target="_blank"
                  >
                    Shopify App JS GitHub repository
                  </Link>
                  .
                </Text>
              </BlockStack>
            </Card>
            <InlineStack align="end">
              <Button
                variant="primary"
                onClick={handleApiCall}
                loading={isLoading}
              >
                Check API
              </Button>
            </InlineStack>
          </BlockStack>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap={"600"}>
              <Text variant="headingLg" as="h1">
                Features
              </Text>
              <List type="bullet">
                <List.Item>
                  Automatic handling of online and offline session tokens,
                  including HMAC verification, powered by{" "}
                  <strong>
                    <code>@shopify/shopify-app-express</code>
                  </strong>
                  .
                </List.Item>
                <List.Item>
                  Automatic re-authentication with{" "}
                  <strong>
                    <code>/exitiframe</code>
                  </strong>{" "}
                  if session tokens are missing or deleted from Redis storage.
                </List.Item>
                <List.Item>
                  Built-in HMAC verification for webhooks to ensure secure
                  communication.
                </List.Item>
                <List.Item>
                  Effortless GraphQL API calls to interact with Shopify data.
                </List.Item>
                <List.Item>
                  Modern monorepo setup with React.js, NestJS, and Turbo.js for
                  seamless development and deployment.
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Index;
