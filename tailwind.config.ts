import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Primary brand color - #BDDDFC (soft blue)
				brand: {
					DEFAULT: "#BDDDFC",
					50: "#f0f7ff",
					100: "#e0eeff",
					200: "#c2ddff",
					300: "#95c7ff",
					400: "#5ea6ff",
					500: "#2b8aff",
					600: "#006aff",
					700: "#0052e0",
					800: "#0042b3",
					900: "#00378f",
					950: "#002264",
				},
				// Navy blue (primary dark)
				navy: {
					DEFAULT: "#0a2540",
					50: "#e8f0f9",
					100: "#d1ddf2",
					200: "#b0c2e5",
					300: "#8ea0d5",
					400: "#6b7dc4",
					500: "#4d5fa5",
					600: "#0a2540",
					700: "#081e33",
					800: "#061926",
					900: "#041219",
					950: "#020a0d",
				},
				// Legacy colors for compatibility
				primary: {
					DEFAULT: "#BDDDFC",
					foreground: "#0a2540",
				},
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				// Premium border radius
				premium: "28px",
				card: "20px",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				// Premium animations
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(30px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in-down": {
					"0%": { opacity: "0", transform: "translateY(-30px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in-left": {
					"0%": { opacity: "0", transform: "translateX(-30px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				"fade-in-right": {
					"0%": { opacity: "0", transform: "translateX(30px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				"scale-in": {
					"0%": { opacity: "0", transform: "scale(0.9)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"glow-pulse": {
					"0%, 100%": { boxShadow: "0 0 20px rgba(189, 221, 252, 0.4)" },
					"50%": { boxShadow: "0 0 40px rgba(189, 221, 252, 0.8)" },
				},
				shimmer: {
					"0%": { backgroundPosition: "-200% 0" },
					"100%": { backgroundPosition: "200% 0" },
				},
				"border-glow": {
					"0%, 100%": { borderColor: "rgba(189, 221, 252, 0.5)" },
					"50%": { borderColor: "rgba(189, 221, 252, 1)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in-up": "fade-in-up 0.8s ease-out forwards",
				"fade-in-down": "fade-in-down 0.8s ease-out forwards",
				"fade-in-left": "fade-in-left 0.8s ease-out forwards",
				"fade-in-right": "fade-in-right 0.8s ease-out forwards",
				"scale-in": "scale-in 0.6s ease-out forwards",
				float: "float 6s ease-in-out infinite",
				"glow-pulse": "glow-pulse 2s ease-in-out infinite",
				shimmer: "shimmer 3s linear infinite",
				"border-glow": "border-glow 2s ease-in-out infinite",
			},
			fontFamily: {
				sans: ["Manrope", "Inter", "system-ui", "sans-serif"],
				serif: ["Playfair Display", "Georgia", "serif"],
			},
			boxShadow: {
				soft: "0 4px 20px rgba(189, 221, 252, 0.15)",
				glow: "0 0 30px rgba(189, 221, 252, 0.4)",
				premium:
					"0 10px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(189, 221, 252, 0.15)",
				card: "0 4px 24px rgba(10, 37, 64, 0.08)",
				elevated: "0 20px 50px rgba(10, 37, 64, 0.15)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"mesh-gradient":
					"linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #0a2540 100%)",
			},
			transitionDuration: {
				"700": "700ms",
				"1000": "1000ms",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
