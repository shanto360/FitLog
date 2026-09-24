import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./context/**/*.{js,ts,jsx,tsx}"], theme: { extend: { fontFamily: { display: ["Oswald", "sans-serif"] }, colors: { acid: "#ccff00", ink: "#090b0a", panel: "#121513" } } }, plugins: [] };
export default config;