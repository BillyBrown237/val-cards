'use client'

import { useState, useEffect } from 'react'
import type { ScreenType, ValentineData } from '../types'

const STORAGE_KEY = 'valentine_state'

export function useValentineState(valentineId: string) {
    const [currentScreen, setCurrentScreen] = useState<ScreenType>('proposal')
    const [valentineData, setValentineData] = useState<ValentineData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Load state from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem(`${STORAGE_KEY}_${valentineId}`)
        if (savedState) {
            try {
                const { screen } = JSON.parse(savedState)
                setCurrentScreen(screen)
            } catch (e) {
                console.error('Failed to parse saved state:', e)
            }
        }
    }, [valentineId])

    // Fetch valentine data from API
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/valentines/${valentineId}`)

                if (!response.ok) {
                    throw new Error('Valentine not found')
                }

                const data = await response.json()
                setValentineData(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load valentine')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [valentineId])

    // Save screen state to localStorage whenever it changes
    useEffect(() => {
        if (!loading && valentineData) {
            localStorage.setItem(
                `${STORAGE_KEY}_${valentineId}`,
                JSON.stringify({ screen: currentScreen })
            )
        }
    }, [currentScreen, valentineId, loading, valentineData])

    const navigateTo = (screen: ScreenType) => {
        setCurrentScreen(screen)
    }

    const resetState = () => {
        localStorage.removeItem(`${STORAGE_KEY}_${valentineId}`)
        setCurrentScreen('proposal')
    }

    return {
        currentScreen,
        valentineData,
        loading,
        error,
        navigateTo,
        resetState,
    }
}