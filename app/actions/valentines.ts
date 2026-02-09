// app/actions/valentines.ts
'use server'

import { nanoid } from 'nanoid'
import { supabaseAdmin } from '@/lib/supabase'
import type {Database, ValentineInsert} from '@/lib/types'



export async function createValentine(formData: FormData) {
    try {
        const senderName = formData.get('senderName') as string
        const recipientName = formData.get('recipientName') as string
        const message = formData.get('message') as string
        const shortNote = formData.get('shortNote') as string | null
        const stampType = formData.get('stampType') as string

        const photo1 = formData.get('photo1') as File | null
        const photo1Caption = formData.get('photo1Caption') as string | null
        const photo2 = formData.get('photo2') as File | null
        const photo2Caption = formData.get('photo2Caption') as string | null

       const flowerMsg1 = formData.get('flower_msg_1') as string | null
       const flowerMsg2 = formData.get('flower_msg_2') as string | null
       const flowerMsg3 = formData.get('flower_msg_3') as string | null
       const flowerMsg4 = formData.get('flower_msg_4') as string | null


        // Validate required fields
        if (!senderName || !recipientName || !message) {
            return { error: 'Missing required fields' }
        }

        // Generate unique ID
        const valentineId = nanoid(10)

        // Upload photos to Supabase Storage if provided
        let photo1Url: string | null = null
        let photo2Url: string | null = null

        if (photo1 && photo1.size > 0) {
            const photo1Path = `${valentineId}/photo1.${photo1.name.split('.').pop()}`
            const { data: photo1Data, error: photo1Error } = await supabaseAdmin.storage
                .from('valentine-images')
                .upload(photo1Path, photo1, {
                    contentType: photo1.type,
                    upsert: false,
                })

            if (!photo1Error && photo1Data) {
                const { data: { publicUrl } } = supabaseAdmin.storage
                    .from('valentine-images')
                    .getPublicUrl(photo1Path)
                photo1Url = publicUrl
            }
        }

        if (photo2 && photo2.size > 0) {
            const photo2Path = `${valentineId}/photo2.${photo2.name.split('.').pop()}`
            const { data: photo2Data, error: photo2Error } = await supabaseAdmin.storage
                .from('valentine-images')
                .upload(photo2Path, photo2, {
                    contentType: photo2.type,
                    upsert: false,
                })

            if (!photo2Error && photo2Data) {
                const { data: { publicUrl } } = supabaseAdmin.storage
                    .from('valentine-images')
                    .getPublicUrl(photo2Path)
                photo2Url = publicUrl
            }
        }

        // Default flower messages
        const flowerMessages = [
            "I think about you every daisy ",
            "My heart rose when I saw you ",
            "I love you bunches ",
            "I will never leaf you "
        ]

        // Create the insert data object
        const valentineData: ValentineInsert = {
            id: valentineId,
            recipient_name: recipientName,
            sender_name: senderName,
            proposal_text: `${recipientName}, will you be my valentine?`,
            love_letter: message,
            short_note: shortNote,
            photo1_url: photo1Url || null,
            photo1_caption: photo1Caption || null,
            photo2_url: photo2Url || null,
            photo2_caption: photo2Caption || null,
            flower_msg_1: flowerMsg1 || flowerMessages[0],
            flower_msg_2:flowerMsg2 ||  flowerMessages[1],
            flower_msg_3: flowerMsg3 || flowerMessages[2],
            flower_msg_4: flowerMsg4 || flowerMessages[3],
            stamp_type: stampType,
            created_at: new Date().toISOString(),
            view_count: 0,
        }

        // Insert into database
        const { data, error } = await supabaseAdmin
            .from('valentines')
            .insert(valentineData)
            .select()
            .single()

        if (error) {
            console.error('Database error:', error)
            return { error: 'Failed to create valentine' }
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        const valentineUrl = `${appUrl}/card/${valentineId}`

        return {
            success: true,
            id: valentineId,
            url: valentineUrl,
            message: 'Valentine created successfully!'
        }

    } catch (error) {
        console.error('Error creating valentine:', error)
        return { error: 'Internal server error' }
    }
}