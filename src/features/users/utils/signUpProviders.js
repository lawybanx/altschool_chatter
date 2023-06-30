import { github, google } from '../../../assets/icons';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signUpProviders = [
  {
    bg: '#24292e',
    logo: github,
    text: 'Continue with Github',
    hoverBg: '#000',
    signInMethod: githubProvider,
  },
  {
    bg: '#dbdbdb',
    logo: google,
    text: 'Continue with Google',
    hoverBg: '#d9d9d9',
    color: 'light.color',
    signInMethod: googleProvider,
  },
];
