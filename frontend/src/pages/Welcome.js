import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { GiCrystalBall } from 'react-icons/gi';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center px-4" data-testid="welcome-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-2xl"
      >
        {/* Logo */}
        <div className="mb-8">
          <img src="/logo.png" alt="Flipwill" className="w-64 sm:w-80 mx-auto" />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-subheading text-xl sm:text-2xl text-[#E8DCC8] mb-8"
        >
          Clarity starts with a flip.
        </motion.p>

        {/* Explanation Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-reading text-base sm:text-lg text-[#8B8B8B] mb-12 leading-relaxed space-y-4"
        >
          <p>
            FlipWill is a decision companion designed to help you think when you're stuck.
          </p>
          <p>
            It doesn't predict the future.
          </p>
          <p>
            It challenges your perspective.
          </p>
          <p>
            Using structured randomness, FlipWill helps you see your situation differently — so you can <span className="text-[#E8DCC8]">choose with confidence</span>.
          </p>
          <p className="text-[#E8DCC8] font-subheading text-lg sm:text-xl pt-4">
            Flip the card. Own the choice.
          </p>
        </motion.div>

        {/* Enter Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={() => navigate('/home')}
          data-testid="enter-app-btn"
          className="bg-[#D4AF37] text-[#141414] font-ui uppercase tracking-widest px-16 sm:px-24 py-4 text-lg hover:bg-[#E8C872] transition-all duration-300"
        >
          Flip the Card
        </motion.button>
        
        {/* Subtext under button */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="font-reading text-sm text-[#8B8B8B] mt-4"
        >
          No predictions. Just perspective.
        </motion.p>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 font-reading text-sm text-[#3D3D3D]"
      >
        © 2025 Flipwill
      </motion.p>
    </div>
  );
};

export default Welcome;
