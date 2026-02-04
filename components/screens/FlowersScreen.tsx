'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Flower2, Heart, Sparkles, Leaf } from 'lucide-react'
import type { ValentineData } from '@/lib/types'

interface FlowerScreenProps {
    data?: ValentineData
    onBack?: () => void
}

export default function FlowerScreen({ data, onBack }: FlowerScreenProps) {
    // Flower messages from backend data
    const flowerMessages = [
        data?.flowerMsg1 || "My heart rose when I saw you",
        data?.flowerMsg2 || "I think about you every daisy",
        data?.flowerMsg3 || "I love you bunches",
        data?.flowerMsg4 || "I will never leaf you"
    ]

    // Flower icons for each message
    const flowerIcons = ['🌹', '🌼', '💐', '🍃']

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen w-full overflow-hidden "
        >
            {/* Floating flower petals background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-3xl opacity-20"
                        initial={{
                            x: Math.random() * 100 + 'vw',
                            y: Math.random() * 100 + 'vh',
                            rotate: Math.random() * 360
                        }}
                        animate={{
                            y: ['0vh', '-100vh'],
                            rotate: [0, 360],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {i % 4 === 0 ? '🌹' : i % 4 === 1 ? '🌼' : i % 4 === 2 ? '🌸' : '🌺'}
                    </motion.div>
                ))}
            </div>

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
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider">
                            FLOWERS FOR MY LOVE
                        </h1>
                    </div>
                </motion.div>

                {/* Main content area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center w-full max-w-6xl">
                    {/* Left side: Flower image */}
                    <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            {/* Flower image container */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                                <Image
                                    src="/flowers/bouquet.png"
                                    alt="Beautiful flower bouquet for my love"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />

                                {/* Floating sparkles around the bouquet */}
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute"
                                        style={{
                                            left: `${25 + Math.cos(i * 45) * 40}%`,
                                            top: `${25 + Math.sin(i * 45) * 40}%`
                                        }}
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.5, 1, 0.5]
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: i * 0.2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <Sparkles className="w-4 h-4 text-yellow-300" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side: Flower messages */}
                    <motion.div
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6 md:space-y-8"
                    >
                        {flowerMessages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                {/* Message card */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-white/20 hover:border-white/30 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        {/* Flower icon */}
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="shrink-0 text-4xl"
                                        >
                                            {flowerIcons[index]}
                                        </motion.div>

                                        {/* Message text */}
                                        <div className="flex-1">
                                            <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                                                {message.split('\n').map((line, i) => (
                                                    <span key={i}>
                                                        {line}
                                                        {i < message.split('\n').length - 1 && <br />}
                                                    </span>
                                                ))}
                                            </p>

                                            {/* Optional decorative underline */}
                                            <motion.div
                                                className="h-0.5 bg-linear-to-r from-white/30 to-transparent mt-3"
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ delay: 0.8 + index * 0.1 }}
                                            />
                                        </div>

                                        {/* Heart indicator */}
                                        <Heart className="w-6 h-6 text-pink-300 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                                    </div>
                                </div>


                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
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