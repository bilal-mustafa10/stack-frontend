import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { Person } from '@stacks/profile';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: 'BlockCraft',
      icon: window.location.origin + '/logo.svg',
    },
    redirectTo: '/contracts',
    onFinish: () => {
      console.log('userSession', userSession);
      window.location.reload();
    },
    userSession: userSession,
  });


}

export function getUserData() {
  return userSession.loadUserData();
}

export function getPerson() {
  return new Person(getUserData().profile);
}
