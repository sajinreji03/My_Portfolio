"use client";
import { assets } from '@/assets/assets';
import React from 'react';
import Image from 'next/image';
import { motion } from "motion/react";
import { LayoutTextFlip } from './layouttextflip';
import Beams from './Beams';

const Header = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Beams */}
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={3}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-11/12 max-w-3xl text-center mx-auto flex flex-col justify-center items-center gap-4">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <Image src={assets.sajin} alt="" className="rounded-full w-32" priority/>
        </motion.div>

        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-end gap-2 text-xl md:text-3xl mb-3 font-Ovo"
        >
          Hai ! I'm
          <span className="bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent text-4xl font-extrabold">
            SAJIN REJI
          </span>
        </motion.h3>

        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl lg:text-[66px] font-Ovo flex items-center"
        >
          {/* rotating part */}
          <LayoutTextFlip
            words={["Full Stack", "Front End"]}
            duration={2800}
            className=""
          />
          {/* static part */}
          <span className="font-Ovo font-semibold"> Developer</span>
        </motion.h1>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
          <motion.a
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            href="#contact"
            className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent"
          >
            Contact me <Image src={assets.right_arrow_white} alt="" className="w-4" />
          </motion.a>

          <motion.a
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            href="/SajinReji.pdf"
            download
            className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black"
          >
            My Resume <Image src={assets.download_icon} alt="" className="w-4" />
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Header;
