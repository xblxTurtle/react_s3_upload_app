import React from 'react';

export const FilesList = ({files})=> {
    return (<div>
        <label for="list">List of uploaded files: </label>
        <ul id="list">
            { files?.map((file)=>(<li>{file.key}</li>)) }
        </ul>
    </div>);
};