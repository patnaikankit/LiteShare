import React from "react";
import { Button } from "./UI/Button";
import { 
    Dialog,
    DialogDescription,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogHeader
 } from "@/components/UI/Dialog"
import { Input } from "./UI/Input";
import { Link2, Share } from "lucide-react";
import { QRCodeSVG } from "qrcode.react" 
import toast from "react-hot-toast"
import { useTheme } from "next-themes";

const ShareLink = ({ usercode }: {usercode: string}) => {
    const { theme } = useTheme();
    const handleCopyLink = () => {
        navigator.clipboard.writeText(
            `https://fast-drop.vercel.app/transfer?code=${usercode}`
        );
        toast.success("Link Copied")
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="p-3"
                        disabled={usercode ? false : true}
                    >
                        <Share size={18} />
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Share Link
                        </DialogTitle>

                        <DialogDescription>
                        Anyone with this link can make a P2P connection with you.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center justify-center space-x-2">
                        <div className="flex flex-col w-full gap-y-2 justify-center items-center">
                            <div className="flex justify-center border rounded-md w-fit p-2">
                                <QRCodeSVG
                                    value={`https://lite-share.vercel.app//transfer?code=${usercode}`}
                                    size={128}
                                    bgColor={theme === "dark" ? "#000000" : "#ffffff"}
                                    fgColor={theme === "dark" ? "#ffffff" : "#000000"}
                                    level={"L"}
                                    includeMargin={false}
                                />
                            </div>

                            <div className="flex w-full justify-center gap-x-1">
                                <Input 
                                    id="link"
                                    defaultValue={`https://lite-share.vercel.app//transfer?code=${usercode}`}
                                    readOnly
                                    className="selection:bg-zinc-900 dark:selection:bg-white"
                                />

                                <Button
                                    type="button"
                                    onClick={handleCopyLink}
                                    variant={"outline"}
                                    className="px-3"
                                >
                                    <Link2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ShareLink;