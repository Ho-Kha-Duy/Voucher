const SIZE_PER_CHUNK = 1000;
const BATCH_ID = 'unique_batch_id_123';

function divideDataIntoChunks(data, chunkSize) {
    let chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks;
}

async function initiateData(jsonData, url, text) {

    let chunks = divideDataIntoChunks(jsonData, SIZE_PER_CHUNK);

    executeBtn.disabled = true;
    announceDiv.innerHTML = `<p>${text.textInitiate}...</p>`    

    for (let i = 0; i < chunks.length; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    batchId: BATCH_ID,
                    part: i + 1,
                    totalParts: chunks.length,
                    data: chunks[i]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
          

            if (i === chunks.length - 1) {
                for (const errorKey of Object.values(data)){

                    const entryDiv = document.createElement('div');
                    entryDiv.className = 'response-entry';
    
                    entryDiv.innerHTML = errorKey.replace(/\n/g, '<br>'); 
                    
                    responseDiv.appendChild(entryDiv);
                    responseDiv.scrollTop = responseDiv.scrollHeight
                }
                
            }
        } catch (error) {
            console.error(`Error sending chunk ${i + 1}:`, error);
        }
    }

    
    // try{
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(jsonData),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         for (const errorKey of Object.values(data)){

    //             const entryDiv = document.createElement('div');
    //             entryDiv.className = 'response-entry';

    //             entryDiv.innerHTML = errorKey.replace(/\n/g, '<br>'); 
                
    //             responseDiv.appendChild(entryDiv);
    //             responseDiv.scrollTop = responseDiv.scrollHeight
    //         }
    //     })
    // }
    // catch{
    //     console.log(error);
    // }
    
    announceMessage(`<p style="color: green;">${text.textFinished}</p>`);
    executeBtn.disabled = false;
    fileInput.value = null;
}