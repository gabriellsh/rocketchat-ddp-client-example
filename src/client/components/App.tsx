import { DDPSDK } from '@rocket.chat/ddp-client';
import { useLayoutEffect, useState } from "react";

import Login from "../components/Login";
import Room from "../components/Room";

// TODO Add entry to docs about emitter being a peer dependency
// TODO investigate loginWithPassword not working
// TODO why no error from call?
// TODO fix login type
// TODO set/get credentials not working
// TODO try linking newer ddp-client

const SERVER_URL = 'http://localhost:3000';

const login = async (username: string, password: string, sdk: DDPSDK) => {
  try {
    await sdk.connection.connect();
    // @ts-expect-error because api type is not correct
    const result = await sdk.rest.post('/v1/login', { username, password });
    console.log(result);
    const token = result.data.authToken;
    await sdk.account.loginWithToken(token);
    sdk.rest.setCredentials({
      'X-Auth-Token': token,
      'X-User-Id': result.data.userId,
    });
    const creds = sdk.rest.getCredentials();
    console.log('creds', creds);
  } catch (error: any) {
    console.log(error);
    console.log(await error.json?.());
  }
}

export default function App() {
  const [sdk, setSdk] = useState<DDPSDK | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useLayoutEffect(() => {
    setSdk(() => DDPSDK.create(SERVER_URL));
  }, []);

  if (!sdk) {
    return null;
  }

  if (!loggedIn) {
    return <Login onLogin={async (username, password) => {
      await login(username, password, sdk);
      setLoggedIn(true);
    }} />;
  }

  if (sdk.connection.status !== 'connected') {
    return <div>
      <div>SDK not Connected</div>
      <button onClick={() => {
        setLoggedIn(false);
      }}>Retry connection</button>
    </div>;
  }

  return <Room id='GENERAL' sdk={sdk}/>
}
