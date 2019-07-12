import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'react-ace/'
import 'brace/mode/javascript';
import 'brace/theme/twilight';
import 'brace/snippets/javascript'
import 'brace/ext/language_tools'
import api from '../../services/api'


export default function Editor(props) {

    return (
        <div>
            <AceEditor
                ref='aceEditor'
                className='editor'
                maxLines={Infinity}
                minLines={20}
                width={'100%'}
                mode={"javascript"}
                theme={"twilight"}
                name={"editor"}
                editorProps={{ $blockScrolling: true }}
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                enableSnippets={true}
                {...props}
            ></AceEditor>
        </div >
    )



}

