import type { KeyboardEventHandler } from 'react';

export default function Composer ({ onSend }: { onSend: (msg: string) => Promise<void>}) {
    const send: KeyboardEventHandler<HTMLInputElement> = async (e) => {
        if (e.key === 'Enter') {
            onSend(e.currentTarget.value);
            e.currentTarget.value = '';
        }
    }
    return <input type="text" placeholder="Type a message" onKeyDown={send} />
}
