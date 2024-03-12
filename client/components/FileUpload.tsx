// Component to handle file upload event
import React from "react";
import { Button } from "./UI/Button";
import { Upload } from "lucide-react";
import { Progress } from "./UI/Progress";

type fileUploadProps = {
    fileName: string,
    fileProgress: number,
    showProgress: boolean,
    handleClick: any
}

const FileUpload = ({
    fileName,
    fileProgress,
    showProgress,
    handleClick
} : fileUploadProps ) => {
    return (
        <div className="flex flex-col border rounded-lg  px-3 py-3 text-sm w-full gap-y-2">
            <div className="flex justify-between items-center">
                <div className="flex">
                    {fileName}
                </div>
                <div className="flex">
                    <Button 
                        type="button"
                        variant="outline"
                        className="h-[30px] px-2"
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        <Upload size={15} />
                    </Button>
                </div>
            </div>

            {showProgress ? (
                <div>
                    <Progress 
                        value={fileProgress} 
                        className="h-1"
                    />
                </div>
            ) : null}
        </div>
    )
}

export default FileUpload;