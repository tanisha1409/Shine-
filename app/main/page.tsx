"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Heart, Camera, Cake } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type HeartProps = {
  id: number
  left: number
  delay: number
  duration: number
  size: number // px for lucide 'size' prop
  color: "text-pink-400" | "text-rose-400" | "text-purple-400"
  fillColor: "fill-pink-300" | "fill-rose-300" | "fill-purple-300"
  rotate: string
  xOffset: string
}

export default function MainPage() {
  const [hearts, setHearts] = useState<HeartProps[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const heartArray = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 15,
      size: Math.floor(Math.random() * (36 - 16) + 16), // 16..36 px
      color: (["text-pink-400", "text-rose-400", "text-purple-400"] as const)[Math.floor(Math.random() * 3)],
      fillColor: (["fill-pink-300", "fill-rose-300", "fill-purple-300"] as const)[Math.floor(Math.random() * 3)],
      rotate: `${Math.random() * 30 - 15}deg`,
      xOffset: `${Math.random() * 40 - 20}vw`,
    }))
    setHearts(heartArray)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlayThrough = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        audio.addEventListener("canplaythrough", handleCanPlayThrough, { once: true })
        setIsPlaying(false)
      })

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough)
    }
  }, [])

  const samplePhotos = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250806-WA0011.jpg-t4iTmGYxrunxdUNErupFh6tvaiVXli.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250806-WA0009.jpg-qHTJfKaijoHlzA0ePMMT9cUVMNCqCT.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250806-WA0007.jpg-Nd05c7A8FvEPgE6mVl1zPhvWrqKhZx.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250806-WA0008.jpg-ZfmaEbWW48Fi7LCF9kBL3UhRkoCtUX.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250806-WA0011.jpg-t4iTmGYxrunxdUNErupFh6tvaiVXli.jpeg",
  ]

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) audio.pause()
    else audio.play().catch(() => {})
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100 relative overflow-hidden">
      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        autoPlay
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => console.log("Song loaded successfully")}
        onError={(e) => console.error("Audio error:", e)}
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saiyaara%20Reprise%20-%20Female%20_%20Full%20Song%20Audio%20_%20Saiyaara%20_%20Tanishk%2C%20Faheem%2C%20Arslan%20_%20Shreya%20_%20Irshad%20%5BZOQaMp4ef14%5D-NrbLJhFbnZnCNL7iseffB6t1l1WNlV.mp3"
          type="audio/mpeg"
        />
        {"Your browser does not support the audio element."}
      </audio>

      {/* Audio Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleAudio}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-pink-500 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title={isPlaying ? "Pause Music" : "Play Music"}
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
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-pink-500 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Safelist for Tailwind to ensure dynamic color classes are present */}
        <span
          className="hidden text-pink-400 fill-pink-300 text-rose-400 fill-rose-300 text-purple-400 fill-purple-300"
          aria-hidden="true"
        />
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute animate-float"
            style={
              {
                left: `${heart.left}%`,
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`,
                opacity: 0.4,
                "--float-rotation": heart.rotate,
                "--float-x-offset": heart.xOffset,
              } as React.CSSProperties
            }
          >
            <Heart size={heart.size} className={`${heart.color} ${heart.fillColor}`} />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 animate-bounce-slow">
              <Heart className="w-16 h-16 text-pink-500 fill-pink-400 mx-auto mb-6" />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent mb-8 animate-pulse-slow">
              {"HAPPY BIRTHDAY TANU"}
            </h1>

            <div className="mb-8">
              <p className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">{"14/09/10"}</p>
            </div>

            <div className="flex justify-center space-x-4 mb-12">
              <Heart className="w-8 h-8 text-pink-400 fill-pink-300 animate-ping" />
              <Heart className="w-10 h-10 text-rose-400 fill-rose-300 animate-pulse" />
              <Heart className="w-8 h-8 text-purple-400 fill-purple-300 animate-ping" />
            </div>

            <p className="text-2xl md:text-3xl text-gray-700 font-light italic mb-12">
              {"To the most beautiful soul I know ✨"}
            </p>
          </div>
        </section>

        {/* Message Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-pink-100">
              {/* Last image on top */}
              <div className="mx-auto mb-8 w-28 h-28 rounded-full overflow-hidden shadow-lg animate-bob-slow ring-2 ring-pink-200">
                <img
                  src={
                    samplePhotos[samplePhotos.length - 1] ||
                    "/placeholder.svg?height=112&width=112&query=circular%20portrait%20photo" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg"
                  }
                  alt="Beautiful memory"
                  width={112}
                  height={112}
                  className="w-28 h-28 object-cover"
                  loading="lazy"
                />
              </div>

              <Heart className="w-12 h-12 text-pink-500 fill-pink-400 mx-auto mb-8" />

              <h2 className="text-4xl font-bold text-gray-800 mb-8 font-serif">{"A Special Message for You"}</h2>

              <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed">
                <p className="text-xl italic font-light mb-6">
                  {
                    '"Wishing you a day filled with love, laughter, and all the joy you truly deserve. You light up the lives of everyone around you with your kindness and positivity."'
                  }
                </p>

                <p className="text-lg mb-6">
                  {
                    "I'm so grateful to have you as my friend, and I hope this year brings you amazing adventures, new dreams, and memories you'll cherish forever."
                  }
                </p>

                <p className="text-xl font-medium text-pink-600">
                  {"Happy Birthday, Beautiful! May this year bring you endless reasons to smile. 💕"}
                </p>
              </div>

              <div className="flex justify-center space-x-2 mt-8">
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className="w-6 h-6 text-pink-400 fill-pink-300 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cake Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-12 font-serif">{"Make a Wish! 🎂"}</h2>

            <p className="text-3xl md:text-4xl font-bold text-pink-600 mb-8">{"14/09/25"}</p>

            <div className="relative inline-block">
              <div className="bg-white rounded-3xl p-12 shadow-2xl">
                <div className="relative">
                  <Cake className="w-32 h-32 text-pink-400 mx-auto mb-8" />
                  <img
                    src="/beautiful-birthday-cake.png"
                    alt="Birthday cake with candles"
                    width={200}
                    height={200}
                    className="mx-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="absolute -top-4 -left-4">
                <Heart className="w-8 h-8 text-pink-400 fill-pink-300 animate-bounce" />
              </div>
              <div className="absolute -top-4 -right-4">
                <Heart className="w-6 h-6 text-rose-400 fill-rose-300 animate-pulse" />
              </div>
              <div className="absolute -bottom-4 -left-4">
                <Heart className="w-6 h-6 text-purple-400 fill-purple-300 animate-ping" />
              </div>
              <div className="absolute -bottom-4 -right-4">
                <Heart className="w-8 h-8 text-pink-400 fill-pink-300 animate-bounce" />
              </div>
              <div className="absolute top-1/2 -left-8">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-300 animate-pulse" />
              </div>
              <div className="absolute top-1/2 -right-8">
                <Heart className="w-5 h-5 text-purple-400 fill-purple-300 animate-ping" />
              </div>
            </div>

            <p className="text-xl text-gray-600 mt-8 italic">
              {"Close your eyes, make a wish, and blow out the candles! ✨"}
            </p>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Camera className="w-12 h-12 text-pink-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">{"Beautiful Memories"}</h2>
              <p className="text-xl text-gray-600 italic">{"Every picture tells our story 📸"}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {samplePhotos.map((photo, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
                >
                  <img
                    src={photo || "/placeholder.svg?height=320&width=320&query=memory%20photo"}
                    alt={`Memory ${index + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-gray-600 italic">
                {'"Life is a collection of moments, and with you, every moment is magical" 💫'}
              </p>
            </div>
          </div>
        </section>

        {/* Present Section */}
        <section className="relative flex min-h-[100svh] items-center justify-center px-6 py-10">
          <div className="max-w-2xl text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">🎁 Your Present</h1>
            <p className="text-base md:text-lg text-white/90">
              Surprise unlocked! Wishing you the happiest birthday filled with joy, laughter, and everything you love.
            </p>
            <p className="text-sm text-white/70">P.S. You can go back anytime using your browser’s back button.</p>
          </div>
        </section>

        {/* Present Page */}
        <section className="relative min-h-[100svh] w-full overflow-hidden">
          {/* Reuse the same background for continuity */}
          <div className="absolute inset-0" aria-hidden="true">
            <div
              className="absolute inset-0 bg-center bg-cover kenburns"
              style={{
                backgroundImage: "url('/images/landing-bg.jpg')",
                filter: "brightness(0.9) contrast(1.1) saturate(1.06)",
                transformOrigin: "center",
              }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-pink-200 to-rose-300">
              For You, Tanu 💜
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/90 leading-relaxed">
              Wishing you a day filled with love, joy, and all your favorite things. May this year be your best one yet!
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/" prefetch={false}>
                <Button variant="secondary" className="rounded-full px-6">
                  Back home
                </Button>
              </Link>
              <a
                href="https://wa.me/?text=Thank%20you%20for%20the%20beautiful%20surprise%20%F0%9F%8C%9F"
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <Button className="rounded-full px-6 bg-pink-600 hover:bg-pink-700">Share the smile ✨</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Gift Page */}
        <section className="relative min-h-[100svh] w-full bg-gradient-to-b from-rose-50 to-pink-100">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
            <div className="mb-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-rose-600">Your Present 💐</h1>
              <p className="mt-3 text-lg text-rose-800/80">
                A tiny bundle of joy, memories, and lots of love — just for you.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-rose-200">
              <div className="relative aspect-[16/9] w-full bg-rose-100">
                <Image
                  src="/images/tanu-portrait.jpg"
                  alt="A lovely portrait to celebrate the day"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <p className="text-rose-900 text-lg leading-relaxed">
                  Here&apos;s to you — for the light you carry, the smiles you share, and the warmth you bring wherever
                  you go. May your days be sprinkled with laughter, your nights with peace, and your heart with all the
                  magic you deserve.
                </p>
                <p className="text-rose-900 text-lg leading-relaxed">
                  Keep shining, keep dreaming, and never forget how loved you are. Happy Birthday! ✨
                </p>
                <div className="pt-2">
                  <Link href="/" prefetch={false} aria-label="Back to the surprise">
                    <Button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600">
                      Back to the surprise
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-rose-900/70">With love, always. 🎂🎈</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-gradient-to-r from-pink-100 to-purple-100">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center space-x-3 mb-6">
              {[...Array(7)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-5 h-5 text-pink-400 fill-pink-300 animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
            <p className="text-lg text-gray-600 italic">{"Made with endless love and countless hearts 💕"}</p>
            <p className="text-sm text-gray-500 mt-4">
              {"Happy Birthday, Beautiful! Here's to another year of amazing adventures together ✨"}
            </p>

            <div className="mt-8 pt-6 border-t border-pink-200">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
                {"Shine Jamwal"}
              </h3>
            </div>
          </div>
        </footer>

        {/* Next Page Button */}
        <div className="fixed bottom-4 right-4 z-50">
          <Link href="/" prefetch={false}>
            <Button variant="secondary" className="rounded-full">
              Back to start
            </Button>
          </Link>
        </div>
      </div>

      {/* Local styles for floating hearts and custom animations */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translate3d(var(--float-x-offset, 0), 8vh, 0) rotate(var(--float-rotation, 0));
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          100% {
            transform: translate3d(calc(var(--float-x-offset, 0) * 1.2), -110vh, 0) rotate(var(--float-rotation, 0));
            opacity: 0.4;
          }
        }
        .animate-float {
          animation-name: floatUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes bounceSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2.2s ease-in-out infinite;
        }
        @keyframes pulseSlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.85;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 2.4s ease-in-out infinite;
        }
        @keyframes bobSlow {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-bob-slow {
          animation: bobSlow 3.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
