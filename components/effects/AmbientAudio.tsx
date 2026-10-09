"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2Icon, VolumeXIcon } from "@/components/ui/Icons";

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;

        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }

        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Generate 5-second buffer of soothing soft pink noise (coastal breeze)
        const bufferSize = ctx.sampleRate * 5;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.025;
          b6 = white * 0.115926;
        }

        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;
        noiseSourceRef.current = noiseSource;

        // Biquad lowpass filter for gentle coastal rustle
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(380, ctx.currentTime);
        filterNodeRef.current = filter;

        // Master gain for subtle background presence
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 2.5);
        gainNodeRef.current = gain;

        noiseSource.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noiseSource.start();
        setIsPlaying(true);
      } catch (e) {
        console.warn("Ambient sound context unavailable", e);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        setTimeout(() => {
          noiseSourceRef.current?.stop();
          noiseSourceRef.current?.disconnect();
          setIsPlaying(false);
        }, 1250);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      try {
        noiseSourceRef.current?.stop();
        audioCtxRef.current?.close();
      } catch {}
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      className="group relative flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-sans text-current/80 hover:text-current transition-colors duration-300"
      aria-label={isPlaying ? "Mute Goan coastal ambience" : "Play Goan coastal ambience"}
      data-cursor="SOUND"
    >
      <span className="flex items-center justify-center w-5 h-5 rounded-full border border-current/20 group-hover:border-current/60 transition-colors">
        {isPlaying ? <Volume2Icon size={11} /> : <VolumeXIcon size={11} />}
      </span>
      <span className="hidden sm:inline-block">
        {isPlaying ? "Curtorim Breeze [ON]" : "Goa Ambience"}
      </span>
    </button>
  );
}
