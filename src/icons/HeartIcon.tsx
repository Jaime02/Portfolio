'use client'

import { useState } from "react"

export default function HeartIcon() {
  const [isLiked, setIsLiked] = useState(false)

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <button
      onClick={toggleLike}
      className="relative w-8 h-8 focus:outline-none focus-visible:ring-offset-2 rounded-full"
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      <div
        className={`absolute inset-0 transition-transform duration-200 ${
          isLiked ? "scale-100 text-red-500" : "scale-0 text-red-500"
        }`}
      >
        <svg
          className="absolute inset-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div
        className={`absolute inset-0 transition-transform duration-200 text-white hover:text-gray-400 ${
          isLiked ? "scale-0" : "scale-100"
        }`}
      >
        <svg
          className="absolute inset-0"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
    </button>
  )
}
