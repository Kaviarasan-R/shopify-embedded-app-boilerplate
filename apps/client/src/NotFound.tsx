import { Card, EmptyState, Page } from "@shopify/polaris";

export default function NotFound() {
  return (
    <Page>
      <Card>
        <EmptyState heading="Page Not Found" image="">
          <p>
            The URL you’re looking for isn’t available. It might have been
            moved, renamed, or no longer exists. Please check the URL or return
            to the homepage.
          </p>
        </EmptyState>
      </Card>
    </Page>
  );
}
