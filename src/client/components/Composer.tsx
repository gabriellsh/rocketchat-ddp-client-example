import type { KeyboardEventHandler } from 'react';
import { TextInput, Box } from '@rocket.chat/fuselage';

export default function Composer ({ onSend }: { onSend: (msg: string) => Promise<void>}) {
    const send: KeyboardEventHandler<HTMLInputElement> = async (e) => {
        if (e.key === 'Enter') {
            onSend(e.currentTarget.value);
            e.currentTarget.value = '';
        }
    }
    return <Box w='full' p={16}>
        <TextInput w='full' placeholder="Type a message" onKeyDown={send} />
    </Box>
}
