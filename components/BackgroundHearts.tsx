'use client'

import { motion } from 'framer-motion'
import Image from "next/image";

interface Props {
    variant: 'pink' | 'red'
}


export default function BackgroundHearts({ variant }: Props) {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="absolute inset-0 w-full h-full overflow-hidden -z-10"
        >
            {/* 🌸 Background */}
            <Image
                src={variant === 'pink' ? '/heart_bg.png' : '/heart_bg_red.png'}
                alt=""
                fill
                priority
                className="object-cover"
            />
        </motion.div>
    )
}