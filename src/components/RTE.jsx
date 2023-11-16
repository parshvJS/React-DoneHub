import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({name,control,label,defaultvalue=""}) {
    return (
        <>
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
            <Controller 
            name={name || 'Content'}
            control={control}
            render={({ field={onChange} }) => (
                //Editor conponenet from tineymce
                <Editor
                initialValue='defaul value'
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                            //add all plugins from tinymce
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                        ],
                        toolbar:
                        //all toolbar from tinymce form
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
             onEditorChange={onchange}
                />
            )}

            />
        </>
    );
}

export default RTE;