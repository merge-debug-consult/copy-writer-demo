import { useState, useRef } from 'react'

export default function ImageUpload({ onImageSelect }) {
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file))
    onImageSelect(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  function handleDragOver(e) {
    e.preventDefault()
    setDragging(true)
  }

  function handleDragLeave() {
    setDragging(false)
  }

  function handleClear() {
    setPreview(null)
    onImageSelect(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="image-upload-area">
      {preview ? (
        <div className="image-preview-container">
          <img src={preview} alt="Uploaded property" className="image-preview" />
          <button className="image-clear-btn" onClick={handleClear}>Remove</button>
        </div>
      ) : (
        <div
          className={`image-dropzone ${dragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
        >
          <div className="dropzone-content">
            <span className="dropzone-icon">&#128247;</span>
            <p className="dropzone-text">Drop a property image here</p>
            <p className="dropzone-hint">or click to browse</p>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  )
}
