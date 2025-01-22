"use client"
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import {
  gambar1,
  gambar2,
  gambar3,
  gambar4,
  } from "../../public/index";

const geistSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export default function Home() {
  return (
    <div
      className={`${geistSans.variable}  grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
    <h1>Welcome to Tic Tac Toe!</h1>
    <Image
      src={gambar1}
      alt="ini project lamaku"
      width={200}
      height={200}
      />

    <Link href='/weather' className="bg-emerald-300 px-3 py-3 text-black font-bold rounded-2xl hover:bg-cyan-300"> Open Weather Cast</Link>
    <Link href="/game" className="bg-emerald-300 px-3 py-3 text-black font-bold rounded-2xl hover:bg-cyan-300 ">Play The Game</Link>
    <Link href={`/pokemon`} className="bg-emerald-300 px-3 py-3 text-black font-bold rounded-2xl hover:bg-cyan-300 "> pokemon</Link>
    </div>
  );
}
