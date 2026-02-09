'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, PenLine, Sparkles } from 'lucide-react'
import type { ValentineData } from '@/lib/types'

interface LetterScreenProps {
    data?: ValentineData
    onBack?: () => void
}

export default function LetterScreen({ data, onBack }: LetterScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen w-full overflow-hidden"
        >

            {/* Main content container */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
                {/* Header section */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 tracking-wider">
                            WORDS FROM MY HEART
                        </h1>
                        <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                    </div>

                    {/* Decorative separator */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-1 bg-linear-to-r from-transparent to-pink-300 rounded-full" />
                        <Sparkles className="w-6 h-6 text-pink-400" />
                        <div className="w-16 h-1 bg-linear-to-r from-pink-300 to-transparent rounded-full" />
                    </div>
                </motion.div>

                {/* Letter card */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="relative w-full max-w-2xl"
                >
                    {/* Decorative envelope flap */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-8 bg-linear-to-r from-pink-300 to-rose-300 rounded-t-lg shadow-lg" />

                    {/* Letter paper */}
                    <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-pink-200">
                        {/* Decorative corners */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-pink-300 rounded-tl-lg" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-pink-300 rounded-tr-lg" />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-pink-300 rounded-bl-lg" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-pink-300 rounded-br-lg" />

                        {/* Letter content */}
                        <div className="relative p-6 md:p-10">
                            {/* Header with pen icon */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <PenLine className="w-6 h-6 text-pink-500" />
                                    <span className="text-sm text-gray-500 font-medium">A Letter for You</span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    {data?.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    }) : 'Today'}
                                </div>
                            </div>

                            {/* Letter body */}
                            <div className="space-y-6 font-serif">
                                {/* Personalized greeting */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lg text-gray-800"
                                >
                                    <p className="font-bold text-pink-600 mb-2">
                                        My dearest {data?.recipientName || 'Love'},
                                    </p>
                                    
                                </motion.div>

                                {/* Custom message from backend */}
                                {data?.loveLetter && (
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="bg-linear-to-r from-pink-50 to-rose-50 rounded-lg p-6 border-l-4 border-pink-400"
                                    >
                                        <div className="flex items-start gap-3">
                                            <Heart className="w-6 h-6 text-pink-500 shrink-0 mt-1" fill="currentColor" />
                                            <p className="text-gray-700 italic leading-relaxed">
                                                &#34;{data.loveLetter}&#34;
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Closing */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="pt-6 border-t border-gray-100"
                                >
                                    <div className="space-y-4">
                                        <p className="text-lg font-bold text-pink-600">
                                            I love you so much
                                        </p>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <div className="text-pink-700 font-bold">
                                                {data?.senderName || 'Your Valentine'}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Decorative seal */}
                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className="absolute -bottom-4 right-6 w-20 h-20 bg-linear-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                        >
                            <Heart className="w-10 h-10 text-white" fill="currentColor" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-sm text-gray-600 font-bold"
                >
                    Made with ❤️ for {data?.recipientName || 'you'}
                </motion.p>
            </div>
            {/* 💗 Bottom-right button */}
            <div className="absolute  -bottom-4 md:bottom-6 right-0 md:right-6 z-10">
                <motion.button
                    whileHover={{scale: 1.05, transition: {duration: 0.1}}}
                    whileTap={{scale: 0.95}}
                    animate={{
                        scale: [1, 1.25, 1],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    onClick={onBack}
                    className={'cursor-pointer'}
                >
                    <Image
                        src="/buttons/click-me.png"
                        alt="Click me"
                        width={250}
                        height={50}
                    />
                </motion.button>
            </div>
        </motion.div>
    )
}