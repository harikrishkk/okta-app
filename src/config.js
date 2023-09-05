import logo from './humber.svg';
const config = {
  oidc: {
    issuer: 'https://dev-84219609.okta.com/oauth2/default',
    clientId: '0oab0pgid9sFf5ZSq5d7',
    scopes: ['openid', 'profile', 'email'],
    redirectUri: `${window.location.origin}/login/callback`,
  },
  widget: {
    issuer: 'https://dev-84219609.okta.com/oauth2/default',
    clientId: '0oab0pgid9sFf5ZSq5d7',
    redirectUri: `${window.location.origin}/login/callback`,
    logo: logo,
    scopes: ['openid', 'profile', 'email'],
    i18n: {
      en: {
        'primaryauth.title': 'Sign In With your humber account',
      },
    },
  },
};

export default config;
