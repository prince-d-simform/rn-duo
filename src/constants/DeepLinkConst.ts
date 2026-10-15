export const domain: string = 'rnduo.page.link';

export const bundleId: string = 'com.simform.rnduo';

export const scheme: string = 'rnduo://';

export const deepLinkPrefixes = ['rnduo://', `${domain}//`, `https://${domain}`];

export enum DeepLink {
  // rnduo://magic_link&lang=en&tenantId=austin-electrical-qqm76
  MagicLink = 'magic_link',
  // rnduo://forgot_password&lang=en&tenantId=austin-electrical-qqm76
  ForgotPassword = 'forgot_password',
  // rnduo://?toastMessage=<message content>
  ToastMessage = 'toastMessage',
  // rnduo://?signin
  SignIn = 'signin',
  // rnduo://?details
  Details = 'details'
}

/**
 * Regex for deep links
 */
export const DeepLinkRegex = {
  SignIn: /^signin?$/,
  Details: /^(\d*)?details\/?(\d*)?$/
};

export default DeepLink;
