"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { landing } from "@/content/site-content"

export default function LandingPage() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Robust autoplay with safe fallbacks
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const seekWithinBounds = () => {
      const dur = audio.duration
      if (Number.isFinite(dur) && dur > 1) {
        audio.currentTime = Math.min(landing.songStartSeconds, Math.max(0, dur - 1))
      }
    }

    const tryPlay = async () => {
      try {
        if (audio.readyState >= 1) seekWithinBounds()
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false) // wait for interaction
      }
    }

    const onLoaded = () => {
      seekWithinBounds()
      void tryPlay()
    }
    const onInteract = () => {
      seekWithinBounds()
      void tryPlay()
      window.removeEventListener("pointerdown", onInteract)
      window.removeEventListener("keydown", onInteract)
    }
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        seekWithinBounds()
        void tryPlay()
      }
    }

    void tryPlay()
    audio.addEventListener("loadedmetadata", onLoaded)
    window.addEventListener("pointerdown", onInteract, { once: true })
    window.addEventListener("keydown", onInteract, { once: true })
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded)
      window.removeEventListener("pointerdown", onInteract)
      window.removeEventListener("keydown", onInteract)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        // ignore
      }
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !isMuted
    setIsMuted(audio.muted)
  }

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background image with Ken Burns and visibility boost */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-center bg-cover kenburns"
          style={{
            backgroundImage: `url('${landing.backgroundImage}')`,
            filter: "brightness(1.28) contrast(1.12) saturate(1.18)",
            transformOrigin: "center",
          }}
        />
        {/* Slight overlay for text contrast */}
        <div className="absolute inset-0 bg-black/28" />
        {/* Bottom gradient for CTA area */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/48 to-transparent" />
      </div>

      {/* Audio element + top-right controls */}
      <audio
        ref={audioRef}
        src={landing.songUrl}
        autoPlay
        loop
        preload="metadata"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleAudio}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-pink-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title={isPlaying ? "Pause music" : "Play music"}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          onClick={toggleMute}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-pink-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center px-5 pt-14 pb-[112px]">
        <h1
          className="text-center text-[12vw] leading-[0.95] font-extrabold tracking-wide uppercase shine
                     bg-clip-text text-transparent bg-gradient-to-b from-pink-300 via-rose-300 to-purple-300
                     drop-shadow-[0_4px_24px_rgba(255,255,255,0.12)] md:text-7xl"
          aria-label="Happy Birthday My Tanu"
        >
          {landing.headingLines[0]}
          <br />
          {landing.headingLines[1]}
          <br />
          {landing.headingLines[2]}
        </h1>

        <div className="mt-6 w-full max-w-3xl text-center space-y-5 text-white/90">
          {landing.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-xl md:text-2xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] text-balance"
            >
              {p}
            </p>
          ))}
          <p className="text-sm md:text-base text-white/90">
            {landing.colorTag.label}{" "}
            <span className="align-middle rounded-md bg-black px-3 py-1 font-medium text-white shadow">
              {landing.colorTag.value}
            </span>
          </p>
        </div>
      </div>

      {/* Bottom fixed CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto mb-4 w-full max-w-md px-4">
          <Link
            href={landing.cta.href}
            className="pointer-events-auto block"
            prefetch={false}
            aria-label="Open your present"
          >
            <Button
              size="lg"
              className="w-full rounded-full px-8 py-6 text-base md:text-lg font-semibold
                         bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg
                         shadow-rose-500/25 hover:from-pink-600 hover:to-rose-600 hover:shadow-rose-500/40
                         focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              {landing.cta.label}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
