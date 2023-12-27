var responseDiv = document.getElementById('responseMessage');
var announceDiv = document.getElementById('announceMessage');
var actionSelect = document.getElementById('actionSelect');
var executeBtn = document.getElementById('executeBtn');
var fileInput = document.getElementById('jsonFile');
var passwordInput = document.getElementById('passwordInput');

// Add an event listener to the dropdown for the 'change' event
actionSelect.addEventListener('change', function() {
    // Change button text based on the current value of the dropdown
    if(this.value === 'add') {

        executeBtn.innerHTML = 'ADD'; // Change button text to "Add JSON"
        fileInput.removeAttribute('style');

    } else if(this.value === 'update') {

        executeBtn.innerHTML = 'UPDATE'; // Change button text to "Update JSON"
        fileInput.removeAttribute('style');
     
    } else if(this.value === 'download') {
        
        executeBtn.innerHTML = 'DOWNLOAD'; // Change button text to "Update JSON"
        fileInput.style.display = "none";
        
    } 
});

//Change function of execute button
executeBtn.addEventListener('click', async () => {
    if(!passwordInput.value){
        announceMessage(`<p style="color: red;">Please enter a password to proceed</p>`)
    }else {
        fetch('https://vouchertest-boi4jqzydq-uc.a.run.app/check/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: passwordInput.value,
            })
        })
        .then(response => response.json())
        .then(data => {
            if(!data.isCorrect)
            {
                return announceMessage(`<p style="color: red;">Incorrect password</p>`)
            }
            responseDiv.innerHTML = null;
            const action = actionSelect.value;
            const file = fileInput.files[0];        
        
            if (action !== "download") {
                if (!file || (file.type !== "application/vnd.ms-excel" && file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
                    return announceMessage(`<p style="color: red;">Please upload a valid Excel file</p>`);
                }
                
                try {
                    convertToJson();                    
                } catch (error) {
                    console.log('Error parsing JSON:', error);
                }
            }else {
                downloadData();
            }
        })
        .catch(error => console.log('Error:', error))
    }    
});

//Notification messages
function announceMessage(text){
    announceDiv.innerHTML = text;
    setTimeout(() => {
        announceDiv.innerHTML = null;
    }, 3000);
}