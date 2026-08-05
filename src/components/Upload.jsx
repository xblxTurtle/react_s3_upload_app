import React, {useState} from 'react';

export const Upload = ({onUpload})=> {
    const [actionUrl, setActionUrl] = useState('')
    
    return (<div>
        <form method="put" enctype="multipart/form-data" action={actionUrl} onSubmit={(e) =>{
            e.preventDefault();

            // Read the form data
            const form = e.target;
            const formData = new FormData(form);


            if (actionUrl) {
                // You can pass formData as a fetch body directly:
                fetch(actionUrl, { method: "PUT", body: formData }).then(()=>{
                    onUpload();
                });
            }
        }}>
            <div>
                <label for='file'>Select new file for upload:</label>
                <input type="file" id="file" onChange={(e)=>{
                    console.log('e.target.value = ',e.target.value)
                    const str = e.target.value;
                    if (e.target.value) {
                        const fileName = str.substring(str.lastIndexOf('\\')+1);
                        setActionUrl("https://test-485291254674-eu-west-2-an.s3.eu-west-2.amazonaws.com/upload/" + fileName);
                    }
                }}/>
            </div>
            <div>
                <button disabled={!actionUrl}>Upload</button>
            </div>
        </form>
    </div>);
};