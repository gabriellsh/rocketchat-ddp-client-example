import type { DDPSDK } from '@rocket.chat/ddp-client';
import { useEffect, useState } from "react";

export default function Index({ sdk, roomId }: { sdk: DDPSDK, roomId: string }) {
  const [messages, setMessages] = useState(new Map());

  useEffect(() => {
    // The SDK exposes a stream method that allows you to subscribe to a publication
    // All streams have type definitions
    // Below is an example of subscribing to the room-messages publication, which receives message updates from a room
    // The stream method return has a stop property, whuch is a function that is used to unsubscribe from the publication
    // TIP: always unsubscribe from publications when you're done with them. This saves bandwidth and server resources
    return sdk.stream('room-messages', roomId, (args) => {
      setMessages((messages) => {
      messages.set(args._id, args);
      return new Map(messages);
      });
    }).stop;
  }, [sdk, roomId]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {Array.from(messages.values()).map((message) => {
        return <p key={message._id}>{message.msg}</p>
      })}
    </div>
  );
}
