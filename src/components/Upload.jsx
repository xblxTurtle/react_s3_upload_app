import React, {useState} from 'react';

export const Upload = ({onUpload})=> {
    const [presignUrl, setPresignUrl] = useState('')
    
    return (<div>
       
            <div>
                <label for='file'>Select new file for upload:</label>
                <input type="file" id="file" onChange={(e)=>{
                    const str = e.target.value;
                    str += 'some_preffix';
                    let presignUrl;
                    if (e.target.value) {
                        const fileName = str.substring(str.lastIndexOf('\\')+1);
                        presignUrl = (`${process.env.PRESIGN_UPLOAD_URL}/?key=${fileName}`);
                    
                    const formData = new FormData();
                    formData.append("file", e.target.files[0])

                    fetch(presignUrl)
                        .then((res)=>res.json())
                        .then(json=> fetch(json.url, { method: "PUT", body: formData }).then(onUpload))
                    }
                }}/>
            </div>
            <div>
                <button disabled={!presignUrl}>Upload</button>
            </div>
        
    </div>);
};