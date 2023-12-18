import { createContext } from 'react';
import type { DDPSDK } from '@rocket.chat/ddp-client';

type AppContextValue = {
	sdk?: DDPSDK;
}

const AppContext = createContext<AppContextValue>({});

const AppProvider = ({ children, sdk }: { children: React.ReactNode, sdk: DDPSDK }) => {
	return <AppContext.Provider value={{ sdk }}>{children}</AppContext.Provider>;
}

export default AppProvider;

