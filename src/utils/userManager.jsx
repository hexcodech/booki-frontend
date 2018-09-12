import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
    client_id: 'booki_webapp',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
    post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`,
    response_type: 'id_token',
    scope: 'openid profile',
    filterProtocolClaims: true,
    loadUserInfo: true,
    authority: 'http://localhost:3000/oidc',
};
const userManager = createUserManager(userManagerConfig);

export default userManager;