import type { DDPSDK } from '@rocket.chat/ddp-client';
import { useEffect, useState } from "react";

export default function Index({ sdk, roomId }: { sdk: DDPSDK, roomId: string }) {
  const [messages, setMessages] = useState(new Map());

  useEffect(() => {
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
