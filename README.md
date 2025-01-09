# Shopify Embedded App Boilerplate

## Prerequisites

1. **Install Node.js**: Ensure Node.js is installed.
2. **Node.js Version**: Use Node.js `22.12.0` and npm `11.0.0`.
3. **Redis**: Make sure Redis is installed and running locally or on a server.

## Environment Setup

1. Create a `.env` file by copying variables from `.env.example`.
2. Obtain **Client ID** and **Client Secret** by manually creating a Shopify app from the [Shopify Partners Dashboard](https://partners.shopify.com).
   - Set:
     - `SHOPIFY_API_KEY` = Client ID
     - `SHOPIFY_API_SECRET` = Client Secret
3. Use **ngrok** for local development:
   - APP URL = `ngrok_url`.
   - Allowed redirection URL: `ngrok_url/api/auth/callback`.

## Webhooks

1. Set up compliance webhooks at: `/api/webhooks`.
2. If changes are made to webhook handlers, ensure the corresponding topic is added to the TOML file under webhook subscriptions and deploy the changes using `shopify app deploy`.

## Configuration

1. Refer to the [Shopify App TOML Guide](https://shopify.dev/docs/apps/build/cli-for-apps/app-configuration).
2. Deploy updates to the app:
   - Use `shopify app deploy` for releasing new versions after TOML changes.
   - Link and push configuration using:
     - `shopify app config link`
     - `shopify app config push`.

## Development & Deployment

1. **Start Dev Environment**: `ngrok:dev`.
2. **Start Prod Environment**: `ngrok:prod`.
3. Use `dev` or `prod` environments to correctly serve static files.

## Managing Changes

1. Update TOML files:
   - Run `link`, `push`, and `deploy` commands to apply changes.
   - If new webhook topics are added, include handlers and update the subscription topics in the TOML file.
2. Always execute commands in the **source directory** (no need to navigate to subdirectories).

## Installing Packages

- Install packages for a specific workspace:
  ```bash
  npm i --workspace=apps/<folder-name> <package-name>
  ```

## App Installation

- Install the application using:
  ```bash
  https://<ngrok-domain>/api/auth?shop=<shop-name>.myshopify.com
  ```

## References

[Nest.js Guide](https://docs.nestjs.com/first-steps)

[Shopify GraphQL Admin API](https://shopify.dev/docs/api/admin-graphql)

[Shopify CLI App Configuration](https://shopify.dev/docs/apps/build/cli-for-apps/app-configuration)

[Access Scopes](https://shopify.dev/docs/api/usage/access-scopes)

[Webhook Topics](https://shopify.dev/docs/api/admin-graphql/2025-01/enums/webhooksubscriptiontopic)

## Sample Configuration

![Sample Configuration](docs/Sample%20Shopify%20Partners%20Configuration.png)
