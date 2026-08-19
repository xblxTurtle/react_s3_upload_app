import React, {useState, useEffect} from 'react';
import { Upload } from './components/Upload.jsx';
import { FilesList } from './components/FilesList.jsx';

export const App = () => {
    const [files, setFiles] = useState();

        const startRequest = async () => { 
                const res = await fetch(`https://${process.env.UPLOAD_BUCKET_NAME}.s3.eu-west-2.amazonaws.com/?list-type=2&prefix=upload/`,{
                cache: "no-store"
            });
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const xmlText = await res.text();
            const xml = new DOMParser().parseFromString(xmlText, "application/xml");

            const files = [...xml.getElementsByTagNameNS("*", "Contents")]
            .map(element => ({ 
                key: element.getElementsByTagNameNS("*", "Key")[0]?.textContent,
                size: Number(element.getElementsByTagNameNS("*", "Size")[0]?.textContent)
            }
            ))
            .filter(object => object.size > 0);

            console.log('files = ',files)
            setFiles(files);
        }

        useEffect(()=>{
            startRequest();
        },[]);

    return <div>
        <FilesList files={files}></FilesList>
        <Upload onUpload={() => { console.log('calling start request'); startRequest();}}/>
    </div>
};