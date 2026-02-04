import type { ValentinesTable } from './supabase'
import {ValentineData} from "@/lib/types";

export const toValentineInsert = (
    data: ValentineData
): ValentinesTable['Insert'] => ({
    id: data.id,
    recipient_name: data.recipientName,
    sender_name: data.senderName,
    proposal_text: data.proposalText,
    love_letter: data.loveLetter,
    photo1_url: data.photo1Url ?? null,
    photo1_caption: data.photo1Caption ?? null,
    photo2_url: data.photo2Url ?? null,
    photo2_caption: data.photo2Caption ?? null,
    flower_msg_1: data.flowerMsg1,
    flower_msg_2: data.flowerMsg2,
    flower_msg_3: data.flowerMsg3,
    flower_msg_4: data.flowerMsg4,
    stamp_type: 'default',
})
