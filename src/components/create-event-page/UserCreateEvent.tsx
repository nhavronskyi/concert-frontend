import React, {useState} from 'react';
import {convertToRaw, EditorState, RichUtils, ContentState} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import {BlockStyleControls, InlineStyleControls} from '../show-event-page/TextEditor';
import '../show-event-page/event-info.css';
import './create-event.css';
import {createEvent, getImage, uploadImage} from "../../service/EventService";
import {TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

function UserCreateEvent() {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(ContentState.createFromText('Опишіть вашу подію')));
    const [selectedImageName, setSelectedImageName] = useState('');

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        switch (e.target.name) {
            case "title":
                setTitle(e.target.value);
                break;
            case "location":
                setLocation(e.target.value);
                break;
            case "price":
                setPrice(e.target.value);
                break;
            case "image":
                const files = e.target.files;
                if (files) {
                    setSelectedImageName(files ? files[0].name : '');
                    uploadImage(title, files[0]);
                    setImage(getImage(title));
                }
                break;
            default:
                break;
        }
    };

    const toggleBlockType = (blockType: string) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const toggleInlineStyle = (inlineStyle: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const refreshFields = (): void => {
        setTitle("");
        setLocation("");
        setDate(null);
        setPrice("");
        const emptyContentState = ContentState.createFromText('');
        const emptyEditorState = EditorState.createWithContent(emptyContentState);
        setEditorState(emptyEditorState);
    };

    const addEvent = (): void => {
        const description = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        const event = {title, location, description, date: date || new Date(), price, image};
        createEvent(event).then(r => r);
    };


    return (<div className="create-container">
        <div className="main-box">
            <p className="title">Творіть і надихайтеся: <i>cтворіть</i> свою подію</p>
            <form onSubmit={addEvent}>
                <TextField name="title" fullWidth label="Назва-заголовок події"
                           variant="standard" value={title}
                           style={{marginBottom: '40px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'},
                           }}
                           onChange={handleChanges}/>
                <TextField name="location" fullWidth label="Розташування" variant="standard"
                           value={location}
                           style={{marginBottom: '40px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'},
                           }}
                           onChange={handleChanges}/>

                <TextField name="price" label="Ціна" fullWidth variant="standard"
                           value={price}
                           style={{marginBottom: '40px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'},
                           }}
                           onChange={handleChanges}/>


                <div className="customDateTimePicker">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Дата і час"
                            value={date}
                            defaultValue={new Date()}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                        />
                    </LocalizationProvider>
                </div>

                <div className="editor-container">
                    <div className="toolbar">
                        <BlockStyleControls editorState={editorState} onToggle={toggleBlockType}/>
                        <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle}/>
                    </div>
                    <div className="editor">
                        <Editor editorState={editorState} onChange={setEditorState}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className="fileInputLabel">
                        {selectedImageName ? selectedImageName : 'Завантажити фото'}
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="fileInput"
                            onChange={handleChanges}
                        />
                    </label>
                </div>

                <div className="button-container">
                    <button type="submit" id="create">Створити</button>
                    <button onClick={refreshFields}>Очистити</button>
                </div>
            </form>
        </div>
    </div>);
}

export default UserCreateEvent;
