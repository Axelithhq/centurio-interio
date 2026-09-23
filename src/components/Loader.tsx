"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/50 mx-auto mb-5 shadow-2xl">
              <Image
                src="/logo.png"
                alt="CENTURIO DESIGNS Emblem"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl text-charcoal mb-4">
              CENTURIO
              <span className="text-gold"> DESIGNS</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-6">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  className="h-[2px] bg-gold"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
