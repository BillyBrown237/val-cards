'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ValentineData } from '@/lib/types'

interface FlowerScreenProps {
    data?: ValentineData
    onBack?: () => void
}

export default function FlowerScreen({ data, onBack }: FlowerScreenProps) {
    const flowerMessages = [
        data?.flowerMsg1 || 'My heart rose when I saw you',
        data?.flowerMsg2 || 'I think about you every daisy',
        data?.flowerMsg3 || 'I love you bunches',
        data?.flowerMsg4 || 'I will never leaf you',
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden "
        >

            <div className="relative w-full max-w-7xl px-4 py-8 md:py-12">
                {/* Title */}
                <motion.h1
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-8 md:mb-12 text-center text-3xl md:text-5xl font-bold tracking-wider drop-shadow-lg"
                    style={{ fontFamily: 'cursive' }}
                >
                    FLOWERS FOR MY LOVE
                </motion.h1>

                {/* Main content grid */}
                <div className="relative flex flex-col lg:grid lg:grid-cols-3 gap-8 items-center">

                    {/* LEFT COLUMN - Messages 1 & 2 */}
                    <div className="w-full space-y-6 order-2 lg:order-1">
                        {flowerMessages.slice(0, 2).map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 + index * 0.2 }}
                                className="relative"
                            >
                                <div className="relative bg-white rounded-3xl shadow-2xl p-6 border-4 border-pink-300 transform hover:scale-105 transition-transform duration-300">
                                    {/* Heart decoration */}
                                    <div className="absolute -top-4 -right-4 text-5xl">
                                        💝
                                    </div>
                                    <p className="text-lg md:text-xl font-semibold text-rose-700 text-center leading-relaxed" style={{ fontFamily: 'cursive' }}>
                                        {msg}
                                    </p>
                                    {/* Small hearts decoration */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                        <span className="text-pink-400">💕</span>
                                        <span className="text-red-400">💕</span>
                                        <span className="text-pink-400">💕</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CENTER COLUMN - Bouquet */}
                    <div className="flex justify-center items-center order-1 lg:order-2">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.2,
                                type: 'spring',
                                stiffness: 100
                            }}
                            className="relative w-72 h-72 md:w-150 md:h-150"
                        >
                            {/* Glow effect behind bouquet */}
                            <div className="absolute inset-0 bg-pink-300 rounded-full blur-3xl opacity-40 animate-pulse" />

                            <Image
                                src="/flowers/bouquet.png"
                                alt="Flower bouquet"
                                fill
                                className="object-contain relative z-10 drop-shadow-2xl"
                                priority
                            />

                            {/* Sparkles around bouquet */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute text-3xl"
                                    style={{
                                        top: `${20 + Math.random() * 60}%`,
                                        left: `${Math.random() * 100}%`,
                                    }}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                    }}
                                >
                                    ✨
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN - Messages 3 & 4 */}
                    <div className="w-full space-y-6 order-3">
                        {flowerMessages.slice(2, 4).map((msg, index) => (
                            <motion.div
                                key={index + 2}
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.8 + index * 0.2 }}
                                className="relative"
                            >
                                <div className="relative bg-white rounded-3xl shadow-2xl p-6 border-4 border-red-300 transform hover:scale-105 transition-transform duration-300">
                                    {/* Heart decoration */}
                                    <div className="absolute -top-4 -left-4 text-5xl">
                                        💖
                                    </div>
                                    <p className="text-lg md:text-xl font-semibold text-rose-700 text-center leading-relaxed" style={{ fontFamily: 'cursive' }}>
                                        {msg}
                                    </p>
                                    {/* Small hearts decoration */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                        <span className="text-pink-400">💕</span>
                                        <span className="text-red-400">💕</span>
                                        <span className="text-pink-400">💕</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Click me button */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    onClick={onBack}
                    className="drop-shadow-2xl"
                >
                    <Image
                        src="/buttons/click-me.png"
                        alt="Click me"
                        width={220}
                        height={50}
                    />
                </motion.button>
            </div>
        </motion.div>
    )
}