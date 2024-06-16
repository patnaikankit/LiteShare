import React from "react";
import { GithubIcon } from "lucide-react";
import { Button } from "./UI/Button";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex justify-center">
            <div className="flex border font-extrabold text-[24px] px-3 py-1 m-2 rounded-lg w-full items-center justify-between">
                <div className="flex justify-center items-center">
                    LiteShare
                </div>

                <div className="flex gap-x-2">
                    <div>
                        <Button type="button" className="p-3" variant="ghost">
                            <Link href={"https://github.com/patnaikankit/LiteShare"}>
                                <GithubIcon size={18}/>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;