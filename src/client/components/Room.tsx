import type { DDPSDK } from "@rocket.chat/ddp-client";
import MessageList from "./MessageList";
import { useCallback } from "react";
import Composer from './Composer';

export default function Room ({ sdk, id }: { sdk: DDPSDK, id: string }) {
    const onSend = useCallback(async (msg: string) => {
        const creds = sdk.rest.getCredentials();
        console.log(creds);
        try {
            // await sdk.call('sendMessage', { rid: id, msg } );

            await sdk.rest.post('/v1/chat.sendMessage', { message: { rid: id, msg } });
        } catch (error) {
            console.log(error);
            console.log(await error.json());
        }
    }, [sdk, id]);
    return <div>
        <MessageList sdk={sdk} roomId={id} />
        <Composer onSend={onSend}/>
    </div>;
}