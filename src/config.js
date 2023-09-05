import logo from './humber.svg';
const config = {
  oidc: {
    issuer: process.env.REACT_APP_ISSUER,
    clientId: process.env.REACT_APP_CLIENT_ID,
    scopes: ['openid', 'profile', 'email'],
    redirectUri: `${window.location.origin}/login/callback`,
  },
  widget: {
    issuer: process.env.REACT_APP_ISSUER,
    clientId: process.env.REACT_APP_CLIENT_ID,
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
