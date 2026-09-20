import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Disc3, Play, Square } from 'lucide-react';

interface AudioDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioDemoModal: React.FC<AudioDemoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [crackleVolume, setCrackleVolume] = useState(0.4);
  const [toneFrequency, setToneFrequency] = useState(220);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      // Clean up audio on unmount
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  if (!isOpen) return null;

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Create warm low rumble oscillator
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(toneFrequency, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.08, ctx.currentTime);

      // Procedural vinyl noise buffer (1 second loop)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        // Brownian noise approximation + random crackle spikes
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        // Occasional crackle spike
        const crackle = Math.random() > 0.997 ? (Math.random() * 2 - 1) * 0.8 : 0;
        output[i] = (lastOut * 0.5 + crackle) * 0.15;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter noise to sound like vinyl analog surface
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(crackleVolume, ctx.currentTime);

      // Connect graph
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc.start();
      whiteNoise.start();

      oscNodeRef.current = osc;
      noiseNodeRef.current = whiteNoise;
      gainNodeRef.current = noiseGain;

      setIsPlaying(true);
    } catch {
      // Audio context might require user gesture or be restricted in some environments
    }
  };

  const stopAudio = () => {
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md bg-[#161412] border border-[#27272A] rounded-[2px] shadow-2xl p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
          <div className="flex items-center gap-2">
            <Disc3 className={`w-5 h-5 text-[#0f6bf5] ${isPlaying ? 'animate-spin' : ''}`} />
            <h3 className="font-mono text-[14px] font-semibold text-white">
              Sidewalk DSP // Vinyl Synth
            </h3>
          </div>
          <button
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="text-[#71717A] hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed">
          Procedural mechanical audio synthesizer utilizing the native Web Audio API. Generates analog vinyl surface crackle, turntable motor rumble, and bandpass harmonics with 0 byte external audio downloads.
        </p>

        {/* Tactile Controls */}
        <div className="p-4 bg-[#0E0B08] border border-[#27272A] rounded-[2px] space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#71717A]">AUDIO STATE</span>
            <span
              className={`font-mono text-xs font-semibold ${
                isPlaying ? 'text-[#10B981]' : 'text-[#71717A]'
              }`}
            >
              {isPlaying ? 'DSP GRAPH ACTIVE' : 'STOPPED'}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[11px] text-[#9CA3AF]">
              <span>Analog Noise Surface</span>
              <span>{Math.round(crackleVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={crackleVolume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setCrackleVolume(val);
                if (gainNodeRef.current && audioCtxRef.current) {
                  gainNodeRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
                }
              }}
              className="w-full accent-[#0f6bf5] cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[11px] text-[#9CA3AF]">
              <span>Warm Turntable Resonance</span>
              <span>{toneFrequency} Hz</span>
            </div>
            <input
              type="range"
              min="100"
              max="440"
              step="10"
              value={toneFrequency}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setToneFrequency(val);
                if (oscNodeRef.current && audioCtxRef.current) {
                  oscNodeRef.current.frequency.setValueAtTime(val, audioCtxRef.current.currentTime);
                }
              }}
              className="w-full accent-[#0f6bf5] cursor-pointer"
            />
          </div>

          <button
            onClick={togglePlay}
            className={`w-full py-2.5 rounded-[2px] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 fast-trans cursor-pointer ${
              isPlaying
                ? 'bg-neutral-800 text-white hover:bg-neutral-700'
                : 'bg-[#0f6bf5] text-white hover:bg-blue-600 shadow-[0_0_16px_rgba(15,107,245,0.3)]'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-3.5 h-3.5" />
                <span>HALT SYNTHESIZER</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>START VINYL DSP SYNTH</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
