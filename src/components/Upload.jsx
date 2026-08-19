import React, {useState} from 'react';

export const Upload = ({onUpload})=> {
    const [presignUrl, setPresignUrl] = useState('')
    
    return (<div>
        <form method="put" enctype="multipart/form-data" action={actionUrl} onSubmit={(e) =>{
            e.preventDefault();

            // Read the form data
            const form = e.target;
            const formData = new FormData(form);

            if (presignUrl) {
                fetch(presignUrl)
                    .then((res)=>res.json())
                    .then(json=> fetch(json.url, { method: "PUT", body: formData }).then(onUpload))
            }
        }}>
            <div>
                <label for='file'>Select new file for upload:</label>
                <input type="file" id="file" onChange={(e)=>{
                    console.log('e.target.value = ',e.target.value)
                    const str = e.target.value;
                    if (e.target.value) {
                        const fileName = str.substring(str.lastIndexOf('\\')+1);
                        setPresignUrl(PRESIGN_UPLOAD_URL+"/?key="+fileName);
                    }
                }}/>
            </div>
            <div>
                <button disabled={!actionUrl}>Upload</button>
            </div>
        </form>
    </div>);
};