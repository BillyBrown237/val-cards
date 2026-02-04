import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'
import { supabaseAdmin } from '@/lib/supabase'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)




export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // NEXT.JS 16: params is now async - must await it
        const { id } = await context.params

        const { data, error } = await supabaseAdmin
            .from('valentines')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !data) {
            return NextResponse.json(
                { error: 'Valentine not found' },
                { status: 404 }
            )
        }

        // Increment view count
        await supabaseAdmin
            .from('valentines')
            .update({ view_count: (data.view_count || 0) + 1 })
            .eq('id', id)

        // Return formatted data
        return NextResponse.json({
            id: data.id,
            recipientName: data.recipient_name,
            senderName: data.sender_name,
            proposalText: data.proposal_text,
            loveLetter: data.love_letter,
            shortNote: data.short_note,
            photo1Url: data.photo1_url,
            photo1Caption: data.photo1_caption,
            photo2Url: data.photo2_url,
            photo2Caption: data.photo2_caption,
            flowerMsg1: data.flower_msg_1,
            flowerMsg2: data.flower_msg_2,
            flowerMsg3: data.flower_msg_3,
            flowerMsg4: data.flower_msg_4,
            stampType: data.stamp_type,
            createdAt: data.created_at,
        })
    } catch (error) {
        console.error('Error fetching valentine:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}