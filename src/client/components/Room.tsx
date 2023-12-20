import type { DDPSDK } from "@rocket.chat/ddp-client";
import MessageList from "./MessageList";
import { useCallback } from "react";
import Composer from './Composer';

export default function Room ({ sdk, id }: { sdk: DDPSDK, id: string }) {
    const onSend = useCallback(async (msg: string) => {
        try {
            // For using the REST API, you can use the `sdk.rest` property
            // All properties and methods for both the SDK and the REST API have type definitions
            // You can also check https://developer.rocket.chat/reference/api/rest-api for documentation on API endpoints
            // Below is an example of sending a message to a room using the REST API
            await sdk.rest.post('/v1/chat.sendMessage', { message: { rid: id, msg } });
        } catch (error) {
            console.log(error);
            // Right now the API Cliend (sdk.rest) throws the response when an error happens with the request
            // This means that you can access the response body by doing the following:
            console.log(await (error as Response).json?.());
        }
    }, [sdk, id]);
    return <div>
        <MessageList sdk={sdk} roomId={id} />
        <Composer onSend={onSend}/>
    </div>;
}