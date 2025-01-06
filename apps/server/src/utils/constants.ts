const ROOT_PATH = '/';
const EXITIFRAME_PATH = '/exitiframe';
const AUTH_PATH = '/api/auth';
const AUTH_CALLBACK_PATH = '/api/auth/callback';
const WEBHOOKS_PATH = '/api/webhooks';

// Frontend Routes
const ALLOWED_URLS = ['/', '/exitiframe'];

const SHOP_QUERY = `query {
  shop {
    id
    contactEmail
    currencyCode
    email
    ianaTimezone
    myshopifyDomain
    name
    plan {
      displayName
      partnerDevelopment
      shopifyPlus
    }
    primaryDomain {
      host
      localization {
        country
        alternateLocales
        defaultLocale
      }
      url
    }
    url
  }
}`;

export {
  ROOT_PATH,
  EXITIFRAME_PATH,
  ALLOWED_URLS,
  AUTH_PATH,
  AUTH_CALLBACK_PATH,
  WEBHOOKS_PATH,
  SHOP_QUERY,
};
