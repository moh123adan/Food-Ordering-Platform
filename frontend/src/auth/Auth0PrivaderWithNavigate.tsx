import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/api/MyUserApi";

type Props = {
  children: React.ReactNode;
};

const Auth0PrivaderWithNavigate = ({ children }: Props) => {
  const { createUser } = useCreateMyUser();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("Unable to initialise auth");
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    if (user?.sub && user?.name) {
      createUser({ auth0Id: user.sub, name: user.name });
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0PrivaderWithNavigate;
