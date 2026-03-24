"use client";
import { motion } from "motion/react";
import { useState } from "react";

export default function Idcard() {
  const [flip, setFlip] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      
      <motion.div
        className="relative w-[260px] h-[380px] cursor-pointer"
        onClick={() => setFlip(!flip)}
        whileHover={{ rotateX: 5, rotateY: -5 }}
        transition={{ duration: 0.4 }}
      >
        
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: flip ? 180 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* FRONT */}
          <div
            className="absolute w-full h-full bg-neutral-900 text-white rounded-xl p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            
            <div className="flex justify-between text-[10px] opacity-70">
              <span>24 MAY 23 • 5 AM</span>
              <span>NEW YORK CITY</span>
            </div>

            <div className="absolute right-6 top-20 text-7xl font-bold leading-[1.1]">
              <div>S</div>
              <div>H</div>
              <div>I</div>
              <div>F</div>
              <div>T</div>
            </div>

            <div className="absolute bottom-16 left-6">
              <h2 className="text-lg font-semibold">
                Guillermo <br /> Rauch
              </h2>
              <p className="text-xs opacity-70">
                IN PERSON ATTENDEE
              </p>
            </div>

            <div className="absolute bottom-6 left-6 text-[10px] opacity-60">
              TAPESTRY HALL <br />
              74 GRAND AVE S
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute w-full h-full bg-neutral-800 text-white rounded-xl flex items-center justify-center text-lg font-semibold"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            EVENT PASS
          </div>

        </motion.div>
      </motion.div>

    </div>
  );
}
