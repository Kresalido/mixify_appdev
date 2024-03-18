import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Row, Col, Button, FormControl } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

function Basic({ uploadText, uploadTextClass, iconClass, iconSize, activeStyle, acceptStyle, onDrop }) {
    const [files, setFiles] = useState([]);
    const [editing, setEditing] = useState(null);
    const [fileName, setFileName] = useState('');

    const { getRootProps, getInputProps, isDragActive, isDragAccept } = useDropzone({
        accept: {
            'audio/mp3': ['.mp3'],
        },
        onDrop: acceptedFiles => {
            setFiles(prev => [...prev, ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: (file.size / 1048576).toFixed(2),
                displayName: file.name.split('.').slice(0, -1).join('.')  // Add display name
            }))]);
            onDrop(acceptedFiles);
        }
    });

    const removeFile = file => (event) => {
        event.stopPropagation();
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
    };

    const handleDoubleClick = (file, index) => {
        setEditing(index);
        setFileName(file.displayName);  // Edit display name
    };

    const handleFileNameChange = (event) => {
        setFileName(event.target.value);
    };

    const handleBlur = (file) => {
        file.displayName = fileName.slice(0, 20); 
        setFiles([...files]);
        setEditing(null);
    };

    const handleKeyDown = (event, file, index) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleBlur(file, index);
        }
    };

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const filesView = files.map((file, index) => (
        <React.Fragment key={`${file.path}-${index}`}>
            <Row className="mb-2 py-3 files-view" onClick={(e) => e.stopPropagation()}>
                <Col className='d-flex flex-column justify-content-start'>
                    <Row className='d-flex flex-nowrap song-upload p-2'>
                        <Col className='d-flex justify-content-start align-items-center'>
                            {editing === index ? (
                                <FormControl
                                    value={fileName}
                                    onChange={handleFileNameChange}
                                    onBlur={() => handleBlur(file, index)}
                                    onKeyDown={(event) => handleKeyDown(event, file, index)}
                                />
                            ) : (
                                <h5 onDoubleClick={() => handleDoubleClick(file, index)}>{file.displayName}</h5>
                            )}
                        </Col>
                        <Col>
                            <Select isMulti options={options} placeholder='Select Genre...' styles={{
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: '#fff', // Change this to your desired color
                                }),
                                control: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#4a4a4a',
                                    color: '#4a4a4a',
                                }),
                                option: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#4a4a4a', // Change this to your desired color
                                }),
                            }} />
                        </Col>
                        <Col xs={1}>
                            <Button variant='danger' className='round-btn' onClick={removeFile(file)}>
                                <div className='fa fa-times' />
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <AudioPlayer src={file.preview} layout="horizontal-reverse" customAdditionalControls={[]} className='song-upload-player' />
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    ));

    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
    }), [isDragActive, isDragAccept, activeStyle, acceptStyle]);

    const iconStyle = useMemo(() => ({
        fontSize: iconSize,
        animation: isDragActive ? 'bounce 0.5s infinite' : 'none'
    }), [iconSize, isDragActive]);


    return (
        <Container>
            <Row {...getRootProps({ className: 'song-dropzone vh-25', style })}>
                <input {...getInputProps()} />
                {files.length === 0 ? (
                    <Col className='d-flex align-items-center justify-content-center flex-column'>
                        <Row>
                            <i className={iconClass} style={iconStyle} aria-hidden="true" />
                            <Row className={uploadTextClass}>
                                {uploadText}
                            </Row>
                        </Row>
                    </Col>
                ) : (
                    <Col className='p-3'>
                        <Row className='justify-content-center align-items-center d-flex flex-grow-1'>
                            {filesView}
                        </Row>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

const SongDropzone = ({ uploadText, uploadTextClass, iconClass, iconSize, activeStyle, acceptStyle, onDrop }) => (
    <Basic uploadText={uploadText} uploadTextClass={uploadTextClass} iconClass={iconClass} iconSize={iconSize} activeStyle={activeStyle} acceptStyle={acceptStyle} onDrop={onDrop} />
);

export default SongDropzone;