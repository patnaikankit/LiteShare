"use client"

import * as React from "react"
import { Button } from "./UI/Button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/UI/Dropdown"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const Themebtn = () => {
    const { setTheme } = useTheme();
    return(
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-3">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
                <DropdownMenuItem
                    className="flex gap-x-2"
                    onClick={() => setTheme("light")}
                >
                    <Sun size={18} />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex gap-x-2"
                    onClick={() => setTheme("dark")}
                >
                    <Moon size={18} />
                    Dark
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
};


export default Themebtn;