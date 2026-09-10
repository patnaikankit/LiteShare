import React from "react";
import { GithubIcon, Share2 } from "lucide-react";
import { Button } from "./UI/Button";
import Link from "next/link";

const Navbar = () => {
    return (
        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
            <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#263847]">
                <span className="grid h-8 w-8 rotate-[-6deg] place-items-center rounded-lg bg-[#e46f52] text-white"><Share2 size={17} /></span>
                LiteShare
            </Link>
            <nav className="flex items-center gap-2">
                <Link href="/transfer" className="hidden rounded-lg px-4 py-2 text-sm font-medium text-[#7e8993] transition hover:text-[#e46f52] sm:block">Open a room</Link>
                <Button type="button" className="h-9 w-9 rounded-lg p-0 text-[#7e8993] hover:bg-[#eee8de] hover:text-[#e46f52]" variant="ghost">
                    <Link href="https://github.com/patnaikankit/LiteShare" aria-label="LiteShare on GitHub"><GithubIcon size={17}/></Link>
                </Button>
            </nav>
        </header>
    )
}

export default Navbar;
