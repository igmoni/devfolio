'use client'

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { React, useCallback, useEffect, useState } from 'react'

import { Sun, Moon } from "lucide-react"
import { Button } from "../ui/button"

export const useThemeToggle = ({
    variant = 'circle',
    start = 'center',
    blur = 'false'
}) => {
    const { theme, setTheme, resolvedTheme } = useState()

    const [isDark, setIsDark ] = useState(false)

    useEffect(() => {
        setIsDark(resolvedTheme === 'dark')
    },[resolvedTheme])

    const styleId = 'theme-transition-styles'

    const updateStyles = useCallback((css, name) => {
        if(typeof window === 'undefined') return

        let styleElement = document.getElementById(styleId)

        console.log('style Element', styleElement)
        console.log('name', name)

        if(!styleElement) {
            styleElement = document.createElement('style')
            styleElement.id = styleId
            document.head.appendChild(styleElement)
        }

        styleElement.textContent = css

        console.log('content updated')
    },[])


    const toggleTheme = useCallback(() => {
        setIsDark(!isDark)

        const animation = createAnimation(variant, start, blur)

        updateStyles(animation, css, animation.name)
    })
}
