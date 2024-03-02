import React from "react";
import { Button } from "./Button"
import Link from "next/link";
import { ArrowRight } from "lucide-react"
import InfoTip from "./InfoTip"

const Home = () => {
    return (
        <div className="flex flex-col mt-[30vh] justify-center items-center">
            <h1 className="sm:text-3xl text-xl sm:w-[410px] text-center font-extrabold tracking-wide">
            Share Files Seamlessly 🌐, Connect P2P 🤝, and Chat Instantly 💬 with
            LiteShare!
            </h1>
            <InfoTip />
            <Link href="/transfer">
                <Button variant="outline">Get Started <ArrowRight className="ml-1" size={18} /></Button>
            </Link>
        </div>
    )
}

export default Home