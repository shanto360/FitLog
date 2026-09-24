import type { Metadata } from "next";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = { title: "FitLog — Workout Library", description: "Train with intent. Log every set." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><PlanProvider><Navbar/><main>{children}</main><Footer/><Toaster position="top-center" toastOptions={{style:{background:"#171b18",color:"#f2f4ef",border:"1px solid #343a35"}}}/></PlanProvider></body></html>; }
