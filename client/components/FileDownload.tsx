// Component to handle file download event
import React from "react";
import { Label } from "./UI/Label";
import { Button } from "./UI/Button";
import { Download } from "lucide-react";
import { saveAs } from "file-saver";
import { Progress } from "./UI/Progress";

type fileDownloadProps = {
    fileName: string,
    fileProgress: number,
    fileData: any,
    fileStatus: boolean
}

const FileDownload = ({
    fileName,
    fileProgress,
    fileData,
    fileStatus
} : fileDownloadProps) => {
    const handleDownload = (fileData: any, tempFile: any) => {
        const blob = fileData;
        saveAs(blob, tempFile)
    }

    return (
        <>
            <div className="flex flex-col border rounded-lg  px-3 py-3 w-full gap-y-2">
                <div>
                    <Label className="font-semibold tet-[16px]">
                        Download
                    </Label>
                </div>

                <div className="flex flex-col border rounded-lg  px-3 py-3 text-sm w-full gap-y-2">
                    <div className="flex justify-between items-center">
                        <div className="flex">
                            {fileProgress ? "Receiving..." : fileName}
                        </div>

                        <div className="flex">
                            <Button 
                                className="h-[30px] px-2"
                                type="button"
                                variant="outline"
                                onClick={() => handleDownload(fileData, fileName)}
                            >
                                <Download size={15} />
                            </Button>
                        </div>
                    </div>

                {fileStatus ? (
                    <div>
                        <Progress 
                            value={fileProgress}
                            className="h-1"
                        />
                    </div>
                ) : null}
                </div>
            </div>
        </>
    )
}