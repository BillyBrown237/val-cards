'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
    onPhotoClick: () => void
    onLetterClick: () => void
    onGiftClick: () => void
    onReliveClick?: () => void
}

export default function SuccessHubScreen({
                                             onPhotoClick,
                                             onLetterClick,
                                             onGiftClick,
                                             onReliveClick
                                         }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-6"
        >
            {/* Character with rose */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-0"
            >
                <div
                    className="mb-8"
                >
                    <Image src={'/characters/character-happy.png'} alt={'proposal character'} width={400} height={400} />
                </div>
            </motion.div>

            {/* Title */}
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
            >
                OMG, you said yes! 🥰
            </motion.h1>

            {/* Three cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 gap-y-2 justify-items-center w-full max-w-4xl mb-12">
                {/* Photo Card */}
                <motion.button
                    onClick={onPhotoClick}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#F9C2C2] rounded-3xl w-50 h-50 cursor-pointer"
                >
                    <Image src={'/icons/photo-booth.png'} alt={'photo booth'} width={400} height={400} />
                </motion.button>

                {/* Envelope Card */}
                <motion.button
                    onClick={onLetterClick}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#F9C2C2] rounded-3xl w-50 h-50 cursor-pointer"
                >
                    <Image src={'/icons/envelope.png'} alt={'envelope'} className={'object-cover'} width={400} height={400} />
                </motion.button>

                {/* Gift Card */}
                <motion.button
                    onClick={onGiftClick}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-[#F9C2C2] rounded-3xl w-50 h-50 cursor-pointer"
                >
                    <Image src={'/icons/gift-box.png'} alt={'gift box'} width={400} height={400} />
                </motion.button>
            </div>

            {/* Relive button */}
            {/* 💗 Bottom-right button */}
            <div className="absolute bottom-6 right-6 z-10">
                <motion.button
                    whileHover={{scale: 1.05, transition: {duration: 0.1}}}
                    whileTap={{scale: 0.95}}
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    onClick={onReliveClick}
                    className={'cursor-pointer'}
                >
                    <Image
                        src="/buttons/relive-it.png"
                        alt="Click me"
                        width={250}
                        height={50}
                    />
                </motion.button>
            </div>
        </motion.div>
    )
}