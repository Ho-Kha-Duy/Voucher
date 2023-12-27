function convertToJson() {
    
    const formData = new FormData();
    const fileField = document.getElementById('jsonFile');

    formData.append('excel', fileField.files[0]);

    // Fetch API to POST data
    fetch('https://vouchertest-boi4jqzydq-uc.a.run.app/data/convert', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(async data => {
        const action = actionSelect.value; // Assuming actionSelect is defined
        if (action === "add") {
            await initiateData(data, 'https://vouchertest-boi4jqzydq-uc.a.run.app/data/add', {textInitiate: 'Uploading', textFinished: 'Finish Upload'});
        } else if (action === "update") {
            await initiateData(data, 'https://vouchertest-boi4jqzydq-uc.a.run.app/data/update',{textInitiate: 'Updating', textFinished: 'Finish Update'});
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}
