"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export function CatamountHero() {
  const [searchValue, setSearchValue] = useState("")
  const [currentPlaceholder, setCurrentPlaceholder] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Student-focused job titles
  const jobTitles = [
    "Internship",
    "Research Assistant",
    "Campus Ambassador",
    "Teaching Assistant",
    "Part-time Barista",
    "Student Developer",
    "Marketing Intern",
    "Lab Assistant",
  ]

  useEffect(() => {
    if (!isTyping) return

    const typingSpeed = isDeleting ? 30 : 100
    const pauseTime = 1500

    const timer = setTimeout(() => {
      const currentTitle = jobTitles[placeholderIndex]

      if (!isDeleting) {
        // Typing forward
        setCurrentPlaceholder(currentTitle.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)

        // If we've completed typing the current word
        if (charIndex >= currentTitle.length) {
          setIsDeleting(true)
          clearTimeout(timer)
          setTimeout(() => {
            setIsDeleting(true)
          }, pauseTime)
        }
      } else {
        // Deleting
        setCurrentPlaceholder(currentTitle.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)

        // If we've deleted the entire word
        if (charIndex <= 1) {
          setIsDeleting(false)
          setPlaceholderIndex((placeholderIndex + 1) % jobTitles.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, isTyping, jobTitles, placeholderIndex])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)

    // Only stop typing if there's actual input
    // Resume typing if the input is cleared
    setIsTyping(newValue.length === 0)
  }

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl md:text-5xl">
          What job are you looking for?
        </h1>

        <div className="relative mb-6 w-full">
          <Input
            ref={inputRef}
            type="text"
            placeholder={currentPlaceholder}
            className="h-14 rounded-full border-blue-200 pl-12 pr-24 text-lg shadow-sm focus-visible:ring-blue-500"
            value={searchValue}
            onChange={handleInputChange}
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-400" />
          <Button
            className="absolute right-1 top-1/2 h-12 -translate-y-1/2 rounded-full bg-blue-600 px-6 hover:bg-blue-700"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.focus()
              }
            }}
          >
            Search
          </Button>
        </div>

        <p className="text-sm text-blue-600">Find student-friendly jobs and internships that fit your schedule</p>
      </div>
    </section>
  )
}

