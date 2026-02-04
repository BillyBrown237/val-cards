'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ValentineData } from '@/lib/types'

interface Props {
    data: ValentineData
    onYes: () => void
    onNo: () => void
}

export default function ProposalScreen({ data, onYes, onNo }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-4"
        >
            {/* Stick figure character */}
            <div className="relative mb-8">
                <div
                    className="mb-8"
                >
                    <Image src={'/characters/character-proposal.png'} alt={'proposal character'} width={400} height={400} />
                </div>
                <div className="absolute inset-0 top-[20%] flex items-center justify-center">
                    {/* Question text */}
                    <p
                        className="text-2xl font-bold text-center mb-8 text-black"
                    >
                        {data.recipientName}, will you be<br />
                        <span
                            className="text-black"
                        >
                    my valentine?
                </span>
                    </p>
                </div>
            </div>
            {/* YES/NO buttons in Canva style */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-6 sm:gap-12 mt-8"
            >
                {/* YES Button with pulsing animation */}
                <motion.button
                    onClick={onYes}
                    whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        scale: [1, 1.25, 1],
                    }}
                    className="bg-[#F9C2C2] font-bold text-2xl cursor-pointer text-black border-8 border-[#DC5B4E] border-dashed rounded-4xl px-15 py-6"
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                >
                        YES
                </motion.button>

                {/* NO Button */}
                <button
                    onClick={onNo}
                    className="bg-[#F9C2C2] font-bold text-2xl text-black cursor-pointer border-8 border-[#DC5B4E] border-dashed rounded-4xl px-15 py-6"
                >
                    NO
                </button>
            </motion.div>


        </motion.div>
    )
}
