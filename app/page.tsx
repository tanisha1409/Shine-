"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const bgUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-08-04-11-13-40-404_com.instagram.android.jpg-BWjegPhptfWtoDqWhDzTy4rspUODwE.jpeg"
  const songUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jhol%20_%20Coke%20Studio%20Pakistan%20_%20Season%2015%20_%20Maanu%20x%20Annural%20Khalid%20%5B-2RAq5o5pwc%5D-Rak1uBQpHTVgl4laE7Ertw6Rq0uL7H.mp3"

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const START_AT_SECONDS = 75

    const seekWithinBounds = () => {
      const dur = audio.duration
      if (Number.isFinite(dur) && dur > 0) {
        audio.currentTime = Math.min(START_AT_SECONDS, Math.max(0, dur - 1))
      }
    }

    const tryPlay = async () => {
      try {
        if (audio.readyState >= 1) seekWithinBounds()
        await audio.play()
      } catch {
        // autoplay may be blocked; will retry on interaction/visibility
      }
    }

    const onLoadedMetadata = () => {
      seekWithinBounds()
      tryPlay()
    }

    tryPlay()
    audio.addEventListener("loadedmetadata", onLoadedMetadata)

    const onFirstInteraction = () => {
      seekWithinBounds()
      tryPlay()
      window.removeEventListener("pointerdown", onFirstInteraction)
      window.removeEventListener("keydown", onFirstInteraction)
      document.removeEventListener("visibilitychange", onVisibility)
    }

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        seekWithinBounds()
        tryPlay()
      }
    }

    window.addEventListener("pointerdown", onFirstInteraction, { once: true })
    window.addEventListener("keydown", onFirstInteraction, { once: true })
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata)
      window.removeEventListener("pointerdown", onFirstInteraction)
      window.removeEventListener("keydown", onFirstInteraction)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="bg-cover bg-center kenburns"
          style={{
            backgroundImage: `url('${bgUrl}')`,
            filter: "brightness(1.28) contrast(1.08) saturate(1.12)",
            position: "absolute",
            inset: 0,
            transformOrigin: "center",
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0 bg-black/12" />
      </div>

      <audio ref={audioRef} src={songUrl} autoPlay loop preload="metadata" playsInline className="hidden" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1
            className="mx-auto max-w-6xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight
                       bg-clip-text text-transparent 
                       bg-gradient-to-r from-pink-300 via-rose-200 to-purple-200
                       drop-shadow-[0_6px_24px_rgba(255,255,255,0.12)] shine"
          >
            {"HAPPY BIRTHDAY MY TANU ❤️"}
          </h1>

          <div className="mt-8 max-w-3xl mx-auto text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] space-y-3">
            <p className="text-lg sm:text-xl">
              {"Another year older, wiser… and still looking suspiciously young. 🌺 (Just kidding)"}
            </p>
            <p className="text-lg sm:text-xl">
              {"Thanks for being the kind of friend who’s always up for adventures, late-night talks. (For fun only)."}
            </p>
            <p className="text-lg sm:text-xl">
              {
                "I hope this year brings you endless laughter, unexpected blessings, and cake so good you forget about the calories."
              }
            </p>
            <p className="text-lg sm:text-xl">{"Stay awesome, stay weird, and never stop being you! 🥳💛🖤"}</p>
            <p className="text-sm sm:text-base text-white">
              {"Your love one colour "}
              <span className="inline-block rounded-md px-2 py-0.5 bg-black text-white align-middle">{"BLACK 🖤"}</span>
            </p>
          </div>

          <div className="mt-10">
            <Link href="/main" prefetch={false}>
              <Button
                size="lg"
                className="px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg rounded-full 
                           bg-gradient-to-r from-pink-500 to-rose-500 text-white
                           shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40
                           hover:from-pink-600 hover:to-rose-600
                           focus:outline-none focus:ring-4 focus:ring-white/40
                           transition-transform duration-300 hover:-translate-y-0.5"
                aria-label="Open your present and go to the main website"
              >
                {"Your present 💐"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes kenburns {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
          }
          50% {
            transform: scale(1.08) translate3d(1.2%, -1.2%, 0);
          }
          100% {
            transform: scale(1.12) translate3d(-1.6%, 1.6%, 0);
          }
        }
        .kenburns {
          animation: kenburns 28s ease-in-out infinite alternate;
        }
        @keyframes shineText {
          0% {
            text-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }
          50% {
            text-shadow: 0 0 32px rgba(255, 255, 255, 0.25);
          }
          100% {
            text-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }
        }
        .shine {
          animation: shineText 4s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
