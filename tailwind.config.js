/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C8A96A",
        "gold-light": "#E3C98A",
        "gold-dark": "#A88B4F",
        charcoal: "#1A1A1A",
        "off-white": "#FAFAF8",
        ivory: "#FAF6F0",
        sand: "#F0EAE0",
        "cream-warm": "#FAF6F0",
        "cream-gold": "#F5EDE0",
        "sand-deep": "#EDE7DC",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],
        cormorant: ["Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C8A96A 0%, #E3C98A 50%, #C8A96A 100%)",
        "luxury-light": "linear-gradient(175deg, #FAF6F0 0%, #F5EDE0 35%, #EDE7DC 70%, #F0EAE0 100%)",
        "luxury-mid": "linear-gradient(175deg, #F0EAE0 0%, #E8E0D4 40%, #DDD5C8 70%, #E5DED4 100%)",
        "luxury-dark": "linear-gradient(175deg, #141414 0%, #1A1A1A 40%, #0E0E0E 100%)",
        "luxury-sand": "linear-gradient(170deg, #F4F0EA 0%, #EDE7DC 30%, #E5DDD0 60%, #EDE7DC 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "gold-shimmer": "goldShimmer 3s ease-in-out infinite",
        "float-3d": "float3D 8s ease-in-out infinite",
        "orb-float": "orbFloat 12s ease-in-out infinite",
        "rotate-3d": "rotate3D 10s ease-in-out infinite",
        "shimmer-line": "shimmerLine 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        goldShimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
