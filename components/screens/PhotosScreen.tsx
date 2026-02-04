'use client'

import {AnimatePresence, motion} from 'framer-motion'
import Image from 'next/image'
import type {ValentineData} from '@/lib/types'
import {useEffect, useRef, useState} from "react";
import {ChevronLeft, ChevronRight, Heart, MessageSquare, X} from "lucide-react";

interface Props {
    data: ValentineData
    onBack: () => void
}




export default function PhotosScreen({data, onBack}: Props) {
    const [selectedImage, setSelectedImage] = useState<{
        url: string
        caption: string | null
        index: number
    } | null>(null)

    // Track loaded images
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
    const imageRefs = useRef<(HTMLDivElement | null)[]>([])

    const images = [
        {url: data.photo1Url, caption: data.photo1Caption},
        {url: data.photo2Url, caption: data.photo2Caption}
    ].filter(img => img.url) // Filter out empty images

    // Preload all images on component mount
    useEffect(() => {
        images.forEach(({url}) => {
            if (url && !loadedImages.has(url)) {
                const img = new window.Image()
                img.src = url
                img.onload = () => {
                    setLoadedImages(prev => new Set(prev).add(url))
                }
            }
        })
    }, [])


    const openModal = (url: string, caption: string | undefined, index: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setSelectedImage({url, caption, index})

        // Preload next/previous images for smooth navigation
        const nextIndex: number = (index + 1) % images.length
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const prevIndex: number = (index - 1 + images.length) % images.length

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            [images[nextIndex]?.url, images[prevIndex]?.url].forEach(nextUrl => {
            if (nextUrl && !loadedImages.has(nextUrl)) {
                const img = new window.Image()
                img.src = nextUrl
                img.onload = () => {
                    setLoadedImages(prev => new Set(prev).add(nextUrl))
                }
            }
        })
    }

    const closeModal = () => {
        setSelectedImage(null)
    }

    const navigateImage = (direction: 'prev' | 'next') => {
        if (!selectedImage || images.length <= 1) return

        const newIndex = direction === 'next'
            ? (selectedImage.index + 1) % images.length
            : (selectedImage.index - 1 + images.length) % images.length

        const newImage = images[newIndex]
        setSelectedImage({
            url: newImage.url!,
            caption: newImage.caption,
            index: newIndex
        })
    }

    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="relative lg:h-screen w-full overflow-hidden"
            >

                {/* 💕 Title */}
                <h1 className="relative z-10 text-center  text-4xl md:text-5xl font-extrabold text-pink-500 tracking-wide">
                    FOREVER TOGETHER
                </h1>

                {/* 🌈 Main content */}
                <div
                    className="relative z-10 mt-2 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-1 md:px-6 max-w-6xl mx-auto">
                    {/* 🎞️ Film strip (LEFT) */}
                    <motion.div
                        initial={{x: -40, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 0.2}}
                        className="flex justify-center  lg:justify-end"
                    >
                        <div className="relative space-y-4 w-70 md:w-[320px]">

                            {/* Photo 1 */}
                            <div className="w-65 h-80 cursor-pointer overflow-hidden rounded-md">
                                {data.photo1Url ? (
                                    <img
                                        src={data.photo1Url}
                                        alt="Memory 1"
                                        className="w-full h-full object-cover object-top"
                                        onClick={() => openModal(data.photo1Url!, data?.photo1Caption, 0)}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-sky-100 flex items-center justify-center">
                                        ☁️
                                    </div>
                                )}
                            </div>

                            {/* Photo 2 */}
                            <div className=" w-65 h-80 cursor-pointer overflow-hidden rounded-md">
                                {data.photo2Url ? (
                                    <img
                                        src={data.photo2Url}
                                        alt="Memory 2"
                                        className="w-full h-full object-cover object-top"
                                        onClick={() => openModal(data.photo2Url!, data.photo2Caption, 1)}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-sky-100 flex items-center justify-center">
                                        ☁️
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>


                    {/* 📝 Sticky note (RIGHT) */}
                    <motion.div
                        initial={{x: 40, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 0.4}}
                        className="md:flex md:justify-center md:lg:justify-start"
                    >
                        {/*<div className="relative w-200 h-auto">*/}
                        <div className="grid place-items-center h-87.5 mb-62.5 md:w-150 md:h-150 relative">
                            <Image
                                src="/decorations/note.png"
                                alt=""
                                fill
                                // width={600}
                                // height={600}
                                // className="w-full h-auto"
                                className="object-cover md:object-contain"
                            />
                            <p className="z-10 w-50 text-center top-0 font-[cursive] text-gray-800">
                                {data?.shortNote || "Cherished memories captured forever 💖"}
                            </p>
                            {/*<p className="absolute top-1/2 w-50 right-1/2 text-center text-sm md:text-base text-gray-800 leading-relaxed font-[cursive]">*/}

                            {/*</p>*/}
                        </div>
                    </motion.div>
                </div>

                {/* 📸 Bottom-left character */}
                <div className="absolute bottom-6 left-6 z-10">
                    <Image
                        src="/characters/character-picture.png"
                        alt=""
                        width={200}
                        height={200}
                    />
                </div>

                {/* 💗 Bottom-right button */}
                <div className="absolute bottom-6 right-6 z-10">
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
            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{scale: 0.9, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.9, opacity: 0}}
                            transition={{type: "spring", damping: 25}}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-linear-to-br from-white to-pink-50 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                            >
                                <X className="w-6 h-6 text-gray-700"/>
                            </button>

                            {/* Navigation arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => navigateImage('prev')}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                                    >
                                        <ChevronLeft className="w-6 h-6 text-gray-700"/>
                                    </button>
                                    <button
                                        onClick={() => navigateImage('next')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                                    >
                                        <ChevronRight className="w-6 h-6 text-gray-700"/>
                                    </button>

                                    {/* Image counter */}
                                    <div
                                        className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-lg">
                                        {selectedImage.index + 1} / {images.length}
                                    </div>
                                </>
                            )}

                            {/* Image container */}
                            <div className="relative h-[60vh] overflow-hidden bg-gray-100">
                                <motion.img
                                    key={selectedImage.url}
                                    src={selectedImage.url}
                                    alt="Enlarged memory"
                                    className="w-full h-full object-contain"
                                    initial={{opacity: 0, scale: 0.95}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.95}}
                                    transition={{duration: 0.3}}
                                />

                            </div>

                            {/* Caption section */}
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-pink-100 rounded-lg">
                                        <MessageSquare className="w-5 h-5 text-pink-600"/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Memory Caption</h3>
                                </div>

                                <motion.div
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="bg-white rounded-2xl p-6 shadow-inner border border-pink-100"
                                >
                                    {selectedImage.caption ? (
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            {selectedImage.caption}
                                        </p>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                                            <Heart className="w-12 h-12 text-pink-300 mb-3"/>
                                            <p className="text-lg">No caption added</p>
                                            <p className="text-sm mt-1">This memory speaks for itself 💖</p>
                                        </div>
                                    )}
                                </motion.div>

                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    onClick={closeModal}
                                    className="px-6 py-3 w-full self-center bg-blue-500 text-white mt-2 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Close
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

