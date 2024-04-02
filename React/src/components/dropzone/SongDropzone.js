import React, { useMemo, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Row, Col, Button, FormControl } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

function Basic({ uploadText, uploadTextClass, iconClass, iconSize, activeStyle, acceptStyle, isLoading, onGenreChange, onDrop }) {
    const [files, setFiles] = useState([]);
    const [editing, setEditing] = useState(null);
    const [fileName, setFileName] = useState('');
    const [selectedGenres, setSelectedGenres] = useState({});
    const [playingFile, setPlayingFile] = useState(null);
    const playerRefs = useRef({});

    const styles = {
        valueContainer: (base) => ({
            ...base,
            maxHeight: 50,
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #333",
            "::webkit-scrollbar": {
                width: "8px"
            },
            "::webkit-scrollbar-thumb": {
                background: "#888"
            },
            "::webkit-scrollbar-thumb:hover": {
                background: "#555"
            }
        }),

        multiValue: (base, state) => {
            return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
        },
        multiValueLabel: (base, state) => {
            return state.data.isFixed
                ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
                : base;
        },
        multiValueRemove: (base, state) => {
            return state.data.isFixed ? { ...base, display: "none" } : base;
        },
        control: base => ({
            ...base,
            backgroundColor: '#333',
            color: 'white'
        }),
        menu: base => ({
            ...base,
            backgroundColor: '#333',
            color: 'white',
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #333",
            "::webkit-scrollbar": {
                width: "8px"
            },
            "::webkit-scrollbar-thumb": {
                background: "#888"
            },
            "::webkit-scrollbar-thumb:hover": {
                background: "#555"
            }
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'black' : 'white',
            backgroundColor: state.isSelected ? 'gray' : '#333',
            "&:hover": {
                backgroundColor: '#555'
            }
        }),
        input: (provided, state) => ({
            ...provided,
            color: 'white',
        }),
    };

    const { getRootProps, getInputProps, isDragActive, isDragAccept } = useDropzone({
        accept: {
            'audio/mp3': ['.mp3'],
        },
        onDrop: acceptedFiles => {
            const newFiles = [...files, ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: (file.size / 1048576).toFixed(2),
                displayName: file.name.split('.').slice(0, -1).join('.'),
                genres: []
            }))];
            setFiles(newFiles);
            onDrop(newFiles);

        }
    });

    const removeFile = file => (event) => {
        event.stopPropagation();
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
    };

    const handleGenreChange = (file) => (selectedOptions) => {
        setSelectedGenres(prev => {
            const newGenres = { ...prev, [file.path]: selectedOptions };
            //console.log(newGenres);  // Log the new genres
            onGenreChange(newGenres);
            return newGenres;
        });

        // Update the genres in the file
        const newFiles = files.map(f => f.path === file.path ? { ...f, genres: selectedOptions } : f);
        setFiles(newFiles);
        localStorage.setItem('files', JSON.stringify(newFiles));
    };

    const handleFileNameChange = (e, index) => {
        const newDisplayName = e.target.value;
        let newFiles = [...files];
        newFiles[index].displayName = newDisplayName;
        setFiles(newFiles);
    };

    const handleBlur = () => {
        setEditing(null);
    };

    const handleKeyDown = (event, file, index) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleBlur(file, index);
        }
    };

    const options = [
        { value: 'acoustic', label: 'Acoustic' },
        { value: 'pop', label: 'Pop' },
        { value: 'rock', label: 'Rock' }
    ]

    const filesAddMore = (
        <Row className="mb-2 files-view" style={{ cursor: 'pointer', color: 'gray' }}>
            <Col className='d-flex flex-column justify-content-start'>
                <Row className='d-flex flex-nowrap'>
                    <Col xs={12} className='d-flex justify-content-center align-items-center'>
                        <i className="fa fa-plus-circle px-2" aria-hidden="true" />
                        Click here or drag more songs to add more.
                    </Col>
                </Row>
            </Col>
        </Row>
    );

    const filesView = files.map((file, index) => (
        <React.Fragment key={`${file.path}-${index}`}>
            <Row className="mb-2 py-3 files-view" onClick={(e) => e.stopPropagation()}>
                <Col className='d-flex flex-column justify-content-start'>
                    <Row className='d-flex flex-nowrap song-upload p-2'>
                        <Col className='d-flex justify-content-start align-items-center'>
                            <FormControl
                                value={file.displayName}
                                onChange={(event) => handleFileNameChange(event, index)}
                                onBlur={handleBlur}
                                className='input-style'
                                placeholder="Song name"
                            />
                        </Col>
                        <Col>
                            <Select
                                isMulti
                                maxMenuHeight={100}
                                options={options}
                                placeholder='Select Genre...'
                                closeMenuOnSelect={false}
                                value={file.genres}
                                onChange={handleGenreChange(file)}
                                styles={styles}
                            />
                        </Col>
                        <Col xs={1}>
                            <Button variant='danger' className='round-btn' onClick={isLoading ? null : (removeFile(file)) }>
                                <div className='fa fa-times' />
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <AudioPlayer src={file.preview} layout="horizontal-reverse" customAdditionalControls={[]} showJumpControls={false} className='song-upload-player'
                            ref={c => playerRefs.current[file.path] = c}
                            onPlay={() => {
                                if (playingFile && playingFile !== file.path && playerRefs.current[playingFile]) {
                                    playerRefs.current[playingFile].audio.current.pause();
                                }
                                setPlayingFile(file.path);
                            }} />
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
                            {filesAddMore}
                        </Row>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

const SongDropzone = ({ uploadText, uploadTextClass, iconClass, iconSize, activeStyle, acceptStyle, isLoading, onGenreChange, onDrop }) => (
    <Basic uploadText={uploadText} uploadTextClass={uploadTextClass} iconClass={iconClass} iconSize={iconSize} activeStyle={activeStyle} acceptStyle={acceptStyle} isLoading={isLoading} onGenreChange={onGenreChange} onDrop={onDrop} />
);

export default SongDropzone;