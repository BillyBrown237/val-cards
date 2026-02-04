'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, Heart, User, MessageSquare, Camera, Sparkles, Copy, Check, X, ExternalLink } from 'lucide-react'
import { createValentine } from "@/app/actions/valentines";

const STAMP_OPTIONS = [
    { id: 'cats-love', emoji: '🐱💕', label: 'Cats in Love' },
    { id: 'cats-bouquet', emoji: '🐱💐', label: 'Cats with Flowers' },
    { id: 'cat-letter', emoji: '🐱✉️', label: 'Cat with Letter' },
]

export default function HomePage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        senderName: '',
        recipientName: '',
        message: '',
        shortNote: '',
        stampType: 'cats-love',
    })
    const [photos, setPhotos] = useState<{
        photo1?: File
        photo1Caption?: string
        photo1Preview?: string
        photo2?: File
        photo2Caption?: string
        photo2Preview?: string
    }>({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Modal state
    const [showModal, setShowModal] = useState(false)
    const [generatedUrl, setGeneratedUrl] = useState<string>('')
    const [copied, setCopied] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handlePhotoChange = (photoNumber: 1 | 2, file: File | null) => {
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setPhotos(prev => ({
                ...prev,
                [`photo${photoNumber}`]: file,
                [`photo${photoNumber}Preview`]: reader.result as string
            }))
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append('senderName', formData.senderName)
            formDataToSend.append('recipientName', formData.recipientName)
            formDataToSend.append('message', formData.message)
            formDataToSend.append('shortNote', formData.shortNote)
            formDataToSend.append('stampType', formData.stampType)

            if (photos.photo1) {
                formDataToSend.append('photo1', photos.photo1)
                if (photos.photo1Caption) {
                    formDataToSend.append('photo1Caption', photos.photo1Caption)
                }
            }

            if (photos.photo2) {
                formDataToSend.append('photo2', photos.photo2)
                if (photos.photo2Caption) {
                    formDataToSend.append('photo2Caption', photos.photo2Caption)
                }
            }

            const result = await createValentine(formDataToSend)
            console.log(result)

            if (result.error) {
                throw new Error(result.error)
            }

            if (!result.url) {
                throw new Error('No URL returned from server')
            }

            // Store the URL and show modal instead of redirecting
            setGeneratedUrl(result.url)
            setShowModal(true)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(generatedUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handleVisitPage = () => {
        router.push(generatedUrl)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        // Optionally reset form
        setFormData({
            senderName: '',
            recipientName: '',
            message: '',
            shortNote: '',
            stampType: 'cats-love',
        })
        setPhotos({})
    }

    const handleCreateAnother = () => {
        setShowModal(false)
        // Reset form for another creation
        setFormData({
            senderName: '',
            recipientName: '',
            message: '',
            shortNote: '',
            stampType: 'cats-love',
        })
        setPhotos({})
        setGeneratedUrl('')
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 py-8 px-4 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

                    {/* Floating hearts */}
                    {[...Array(15)].map((_, i) => (
                        <div
                            suppressHydrationWarning
                            key={i}
                            className="absolute text-2xl opacity-20 animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${3 + Math.random() * 2}s`,
                            }}
                        >
                            ❤️
                        </div>
                    ))}
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl mb-6 shadow-lg">
                            <Heart className="w-10 h-10 text-white" fill="currentColor" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            Create Your Digital Valentine
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Craft a beautiful, personalized Valentine&#39;s card with photos and heartfelt messages
                        </p>
                    </div>

                    {/* Form Container */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Details Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-pink-100 rounded-lg">
                                    <User className="w-5 h-5 text-pink-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Sender */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="senderName"
                                                value={formData.senderName}
                                                onChange={handleInputChange}
                                                placeholder="Enter your name"
                                                required
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Recipient */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Recipient&#39;s Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Heart className="h-5 w-5 text-rose-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="recipientName"
                                                value={formData.recipientName}
                                                onChange={handleInputChange}
                                                placeholder="Your Valentine's name"
                                                required
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Short Notes Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-pink-100 rounded-lg">
                                    <MessageSquare className="w-5 h-5 text-pink-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Your Notes</h2>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Something sweet
                                </label>
                                <textarea
                                    name="shortNote"
                                    value={formData.shortNote}
                                    onChange={handleInputChange}
                                    placeholder="A sweet note to go with your memories..)"
                                    required
                                    rows={3}
                                    className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none bg-gray-50"
                                />
                            </div>
                        </div>

                        {/* Message Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-pink-100 rounded-lg">
                                    <MessageSquare className="w-5 h-5 text-pink-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Your Message</h2>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Heartfelt Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Write your heartfelt message here... Share what makes them special to you."
                                    required
                                    rows={6}
                                    className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none bg-gray-50"
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    This message will be displayed prominently on your Valentine&#39;s card
                                </p>
                            </div>
                        </div>

                        {/* Photos Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-pink-100 rounded-lg">
                                    <Camera className="w-5 h-5 text-pink-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Add Photos & Captions</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Photo 1 */}
                                <div className="space-y-4">
                                    <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-pink-400 transition-colors overflow-hidden bg-gray-50 relative group">
                                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-4">
                                            {photos.photo1Preview ? (
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={photos.photo1Preview}
                                                        alt="Photo 1 preview"
                                                        fill
                                                        className="object-cover rounded-lg"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Upload className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <Camera className="w-12 h-12 text-gray-400 mb-3" />
                                                    <span className="text-sm font-medium text-gray-600">Upload Photo</span>
                                                    <span className="text-xs text-gray-500 mt-1">Click or drag to upload</span>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                name="photo1"
                                                accept="image/*"
                                                onChange={(e) => handlePhotoChange(1, e.target.files?.[0] || null)}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Photo Caption
                                        </label>
                                        <textarea
                                            name="photo1Caption"
                                            value={photos.photo1Caption || ''}
                                            onChange={(e) => setPhotos(prev => ({ ...prev, photo1Caption: e.target.value }))}
                                            placeholder="Add a sweet caption..."
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none bg-gray-50"
                                        />
                                    </div>
                                </div>

                                {/* Photo 2 */}
                                <div className="space-y-4">
                                    <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-pink-400 transition-colors overflow-hidden bg-gray-50 relative group">
                                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-4">
                                            {photos.photo2Preview ? (
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={photos.photo2Preview}
                                                        alt="Photo 2 preview"
                                                        fill
                                                        className="object-cover rounded-lg"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Upload className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <Camera className="w-12 h-12 text-gray-400 mb-3" />
                                                    <span className="text-sm font-medium text-gray-600">Upload Photo</span>
                                                    <span className="text-xs text-gray-500 mt-1">Click or drag to upload</span>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                name="photo2"
                                                accept="image/*"
                                                onChange={(e) => handlePhotoChange(2, e.target.files?.[0] || null)}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Photo Caption
                                        </label>
                                        <textarea
                                            name="photo2Caption"
                                            value={photos.photo2Caption || ''}
                                            onChange={(e) => setPhotos(prev => ({ ...prev, photo2Caption: e.target.value }))}
                                            placeholder="Add a sweet caption..."
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stamp Selection Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-pink-100 rounded-lg">
                                    <Sparkles className="w-5 h-5 text-pink-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Choose Your Stamp</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {STAMP_OPTIONS.map((stamp) => (
                                    <label
                                        key={stamp.id}
                                        className={`
                                            relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200
                                            ${formData.stampType === stamp.id
                                            ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 scale-[1.02] shadow-lg'
                                            : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
                                        }
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            name="stampType"
                                            value={stamp.id}
                                            checked={formData.stampType === stamp.id}
                                            onChange={(e) => setFormData(prev => ({ ...prev, stampType: e.target.value }))}
                                            className="sr-only"
                                        />
                                        <div className="flex flex-col items-center">
                                            <span className="text-5xl mb-3">{stamp.emoji}</span>
                                            <span className="font-medium text-gray-800">{stamp.label}</span>
                                            {formData.stampType === stamp.id && (
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                                                    <Heart className="w-3 h-3 text-white" fill="white" />
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="text-center space-y-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                                    relative inline-flex items-center justify-center gap-3 px-12 py-4
                                    bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600
                                    text-white font-semibold text-lg rounded-full shadow-xl
                                    transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                                    group
                                `}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Creating Your Valentine...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        Create Beautiful Valentine
                                        <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" />
                                    </>
                                )}
                            </button>

                            {error && (
                                <div className="inline-flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <p className="text-red-600 font-medium">{error}</p>
                                </div>
                            )}

                            <p className="text-sm text-gray-500">
                                Your Valentine will be created as a beautiful, shareable website
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-pink-100 animate-scale-in">
                        {/* Modal header */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Check className="w-5 h-5 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        Success!
                                    </h3>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Your Valentine card has been created successfully! Share the link below with your special someone.
                            </p>
                        </div>

                        {/* Modal body */}
                        <div className="p-6 space-y-6">
                            {/* Link display */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    Your Valentine Link
                                </label>
                                <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-pink-600 truncate">
                                            {generatedUrl}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCopyLink}
                                        className="flex-shrink-0 p-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                                    >
                                        {copied ? (
                                            <Check className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Copy className="w-5 h-5 text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {copied ? 'Copied to clipboard!' : 'Click the copy icon to copy the link'}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-blue-600">❤️</div>
                                    <div className="text-sm font-medium text-gray-700 mt-1">Ready to Share</div>
                                    <div className="text-xs text-gray-500">Your card is live</div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-purple-600">🎉</div>
                                    <div className="text-sm font-medium text-gray-700 mt-1">Unique Link</div>
                                    <div className="text-xs text-gray-500">Personalized for you</div>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
                                <div className="flex items-start gap-2">
                                    <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            Share your Valentine card
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Send the link via message, email, or social media to surprise your special someone!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleVisitPage}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all hover:scale-[1.02] group"
                            >
                                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Visit Your Card
                            </button>
                            <button
                                onClick={handleCreateAnother}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                <Sparkles className="w-5 h-5" />
                                Create Another
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add animation styles */}
            <style jsx global>{`
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </>
    )
}