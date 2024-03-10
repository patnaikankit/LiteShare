// Implemeting a separate thread for file chunking and downloading

// to store data chunks
let chunks: any = []
let startTime: any
// to store file size and the size fof each chunk
let fileSize, chunkSize = 16000
let currentChunk = 0, totalChunk: any
let currentProgress = 0, prevProgress = 0;

self.addEventListener("message", (event) => {
    if(event.data.status === "fileInfo"){
        // extract the file size and total chunks required
        fileSize = event.data.fileSize;
        totalChunk = Math.ceil(fileSize/chunkSize)
    }
    else if(event.data === "download"){
        // to generate a blob containing the processed file data 
        const blob = new Blob(chunks, { type: "application/octet-stream" });
        const endTime = performance.now()
        const elapsedTime = endTime - startTime;

        // sending the blob and elapsed time to the main thread
        self.postMessage({
            blob: blob,
            timeTaken: elapsedTime
        });

        // resetting data for future data chuks
        chunks = [];
        currentChunk = 0;
    }
    else{
        // to realtime progress of updates to the user
        if(!startTime){
            startTime = performance.now()
            // add data to the chunks array
            chunks.push(new Uint8Array(event.data));
            // calculate progress send it to main thread 
            currentChunk++;
            const progress = (currentChunk/totalChunk)*100
            // only sending updates for a significant change to reduce frequency of future updates
            const roundedProgress = Math.floor(progress)
            if(roundedProgress !== prevProgress){
                prevProgress = roundedProgress
                self.postMessage({
                    progress: prevProgress
                })
            }
        }
    }
})