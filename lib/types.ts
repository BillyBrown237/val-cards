export type ScreenType =
    | 'proposal'      // Initial "Will you be my valentine?"
    | 'tryAgain'      // "Wrong answer, try again"
    | 'successHub'    // "OMG you said yes!" + 3 cards
    | 'photos'        // "Forever Together"
    | 'letter'        // "Words From My Heart"
    | 'flowers'       // "Flowers For My Love"

export interface ValentineData {
    id: string
    recipientName: string
    senderName: string
    proposalText: string
    loveLetter: string
    photo1Url?: string
    photo1Caption?: string
    photo2Url?: string
    photo2Caption?: string
    flowerMsg1: string
    flowerMsg2: string
    flowerMsg3: string
    flowerMsg4: string
    shortNote?: string | null
    stampType?: string
    createdAt?: string
}

export interface AppState {
    currentScreen: ScreenType
    valentineData: ValentineData | null
    loading: boolean
}

export interface Database {
    public: {
        Tables: {
            valentines: {
                Row: {
                    id: string
                    recipient_name: string
                    sender_name: string
                    proposal_text: string
                    love_letter: string
                    photo1_url: string | null
                    photo1_caption: string | null
                    photo2_url: string | null
                    photo2_caption: string | null
                    short_note: string | null
                    flower_msg_1: string
                    flower_msg_2: string
                    flower_msg_3: string
                    flower_msg_4: string
                    stamp_type: string
                    created_at: string
                    view_count: number
                }
                Insert: {
                    id: string
                    recipient_name: string
                    sender_name: string
                    proposal_text: string
                    love_letter: string
                    photo1_url?: string | null
                    photo1_caption?: string | null
                    photo2_url?: string | null
                    photo2_caption?: string | null
                    short_note?: string | null
                    flower_msg_1: string
                    flower_msg_2: string
                    flower_msg_3: string
                    flower_msg_4: string
                    stamp_type: string
                    created_at?: string
                    view_count?: number
                }
                Update: {
                    id?: string
                    recipient_name?: string
                    sender_name?: string
                    proposal_text?: string
                    love_letter?: string
                    photo1_url?: string | null
                    photo1_caption?: string | null
                    photo2_url?: string | null
                    photo2_caption?: string | null
                    short_note?: string | null
                    flower_msg_1?: string
                    flower_msg_2?: string
                    flower_msg_3?: string
                    flower_msg_4?: string
                    stamp_type?: string
                    created_at?: string
                    view_count?: number
                }
            }
        }
    }
}

export type ValentineInsert = Database['public']['Tables']['valentines']['Insert']

// Helper type for table operations
export type Tables = Database['public']['Tables']
export type ValentinesTable = Tables['valentines']