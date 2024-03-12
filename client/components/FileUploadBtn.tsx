import React from "react";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import { File } from "lucide-react";

type fileUploadBtn = {
    inputRef: any,
    handleFile: any,
    uploadBtn: any
}

const FileUploadBtn = ({
    inputRef,
    handleFile,
    uploadBtn
} : fileUploadBtn) => {
    return(
        <>
            <Input 
                type="file"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={(e) => handleFile(e)}
            />

            <Button
                type="button"
                variant="outline"
                className="flex gap-x-2"
                onClick={uploadBtn}
            >
                <File size={15} />
                Select File
            </Button>
        </>
    );
}

export default FileUploadBtn;