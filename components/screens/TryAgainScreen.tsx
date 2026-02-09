'use client'

import {motion, useAnimation} from 'framer-motion'
import Image from 'next/image'
import {useEffect, useState} from "react";

interface TryAgainScreenProps {
    /** Callback function when try again button is clicked */
    onTryAgain: () => void
    /** Optional custom message to display */
    message?: string

}

export default function TryAgainScreen({
                                           onTryAgain,
                                           message = "Wrong answer, try again...",
                                       }: TryAgainScreenProps) {

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden "
        >

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8">

                {/* Sad character with bounce animation */}
                <BouncingCharacter imageSrc={'/characters/character-sad.png'}/>

                {/* Message */}
                <motion.h2
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.3}}
                    className="mt-8 mb-8 text-2xl md:text-3xl font-bold text-gray-800 text-center px-4"
                >
                    {message}
                </motion.h2>

                {/* Try again button */}
                <TryAgainButton onClick={onTryAgain}/>
            </div>
        </motion.div>
    )
}

/**
 * Bouncing character component with random bounce animation
 */
function BouncingCharacter({imageSrc}: { imageSrc: string }) {
    const controls = useAnimation()
    useEffect(() => {
        let isMounted = true

        const randomShake = async () => {
            while (isMounted) {
                await controls.start({
                    x: [0, -8, 10, -12, 14, -10, 6, 0],
                    y: [0, 6, -8, 10, -6, 8, -4, 0],
                    rotate: [0, -6, 8, -10, 7, -5, 3, 0],
                    transition: {
                        duration: 0.25,
                        ease: "linear",
                    },
                })

                // random pause before next freak-out
                await new Promise(r =>
                    setTimeout(r, Math.random() * 400 + 100)
                )
            }
        }

        randomShake()
        return () => {
            isMounted = false
        }
    }, [controls])

    return (
        <motion.div
            initial={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{type: "spring", stiffness: 220, damping: 14}}
            className="relative w-48 h-48 md:w-64 md:h-64"
        >
            <motion.div
                animate={controls}
                whileHover={{
                    x: [-20, 25, -30, 30, -25, 20, 0],
                    y: [15, -20, 25, -25, 20, -15, 0],
                    rotate: [-25, 30, -35, 35, -20, 15, 0],
                    scale: [1, 1.1, 0.95, 1.08, 1],
                    transition: {duration: 0.4}
                }}
                className="w-full h-full">
                <Image
                    src={imageSrc}
                    alt="Sad character"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                />
            </motion.div>
        </motion.div>
    )
}

/**
 * Animated try again button component
 */
function TryAgainButton({onClick}: { onClick: () => void }) {
    return (

        <motion.button
            onClick={onClick}
            whileHover={{scale: 1.05, transition: {duration: 0.1}}}
            whileTap={{scale: 0.95}}
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
            Try Again
        </motion.button>
    )
}
