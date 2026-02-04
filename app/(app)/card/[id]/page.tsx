'use client'

import {useValentineState} from '@/lib/hooks/useValentineState'
import ProposalScreen from '@/components/screens/ProposalScreen'
import TryAgainScreen from '@/components/screens/TryAgainScreen'
import SuccessHubScreen from '@/components/screens/SuccessHubScreen'
import PhotosScreen from '@/components/screens/PhotosScreen'
import LetterScreen from '@/components/screens/LetterScreen'
import FlowersScreen from '@/components/screens/FlowersScreen'
import BackgroundHearts from '@/components/BackgroundHearts'
import {use} from "react";


export default function ValentinePage({
                                          params
                                      }: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const { currentScreen, valentineData, loading, error, navigateTo } = useValentineState(id)

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-valentine-pink-300">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">💕</div>
                    <div className="text-white text-2xl font-bold">Loading your valentine...</div>
                </div>
            </div>
        )
    }

    if (error || !valentineData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-valentine-pink-300">
                <div className="text-center">
                    <div className="text-6xl mb-4">💔</div>
                    <div className="text-white text-2xl font-bold mb-4">Valentine not found</div>
                    <a
                        href="/"
                        className="px-6 py-3 bg-white text-valentine-red-600 rounded-full font-bold hover:scale-105 transition-transform inline-block"
                    >
                        Create Your Own
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen">
            {/* Animated background hearts */}
            <BackgroundHearts variant={currentScreen === 'successHub' || currentScreen === 'flowers' ?  'red' : 'pink'}/>

            {/* Screen Rendering with Transitions */
            }

            {
                currentScreen === 'proposal' && (
                    <ProposalScreen
                        data={valentineData}
                        onYes={() => navigateTo('successHub')}
                        onNo={() => navigateTo('tryAgain')}
                    />
                )
            }

            {
                currentScreen === 'tryAgain' && (
                    <TryAgainScreen
                        onTryAgain={() => navigateTo('proposal')}
                    />
                )
            }

            {
                currentScreen === 'successHub' && (
                    <SuccessHubScreen
                        onReliveClick={() => navigateTo('proposal')}
                        onPhotoClick={() => navigateTo('photos')}
                        onLetterClick={() => navigateTo('letter')}
                        onGiftClick={() => navigateTo('flowers')}
                    />
                )
            }

            {
                currentScreen === 'photos' && (
                    <PhotosScreen
                        data={valentineData}
                        onBack={() => navigateTo('successHub')}
                    />
                )
            }

            {
                currentScreen === 'letter' && (
                    <LetterScreen
                        data={valentineData}
                        onBack={() => navigateTo('successHub')}
                    />
                )
            }

            {
                currentScreen === 'flowers' && (
                    <FlowersScreen
                        data={valentineData}
                        onBack={() => navigateTo('successHub')}
                    />
                )
            }

        </div>
    )
}