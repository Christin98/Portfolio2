"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background blobs */}
      <div className="blob" style={{ width: 400, height: 400, background: "var(--electric-blue)", top: "10%", left: "5%", opacity: 0.06 }} />
      <div className="blob" style={{ width: 350, height: 350, background: "var(--purple)", bottom: "10%", right: "5%", opacity: 0.07 }} />

      <div className="section-container relative z-10">
        {/* Glitch 404 */}
        <motion.div
          className="font-display font-black mb-6 relative select-none"
          style={{ fontSize: "clamp(6rem, 20vw, 14rem)", lineHeight: 1 }}
          animate={{
            textShadow: [
              "2px 0 var(--electric-blue), -2px 0 var(--purple)",
              "0 0 transparent",
              "-2px 0 var(--electric-blue), 2px 0 var(--purple)",
              "0 0 transparent",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        >
          <span className="text-gradient">404</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
            Page Not Found
          </h1>
          <p className="section-subtitle mx-auto text-center mb-10">
            Looks like this data pipeline hit an empty dataset. Let&apos;s get you back to a valid endpoint.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/" className="btn-primary">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <Link href="/#contact" className="btn-secondary">
            <Zap size={16} /> Contact Me
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
