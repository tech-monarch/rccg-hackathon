"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface ImageUploadProps {
  images: File[]
  onImagesChange: (images: File[]) => void
  maxImages?: number
  maxSizeMB?: number
  acceptedTypes?: string[]
  className?: string
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 6,
  maxSizeMB = 5,
  acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  className = "",
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use JPG, PNG, or WebP.`
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSizeMB) {
      return `File size (${fileSizeMB.toFixed(1)}MB) exceeds the ${maxSizeMB}MB limit.`
    }

    return null
  }

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return

    setUploadError("")
    const newFiles: File[] = []
    const errors: string[] = []

    Array.from(fileList).forEach((file) => {
      const error = validateFile(file)
      if (error) {
        errors.push(`${file.name}: ${error}`)
      } else {
        newFiles.push(file)
      }
    })

    if (errors.length > 0) {
      setUploadError(errors.join("\n"))
      return
    }

    const totalImages = images.length + newFiles.length
    if (totalImages > maxImages) {
      setUploadError(`You can only upload up to ${maxImages} images. Please remove some images first.`)
      return
    }

    onImagesChange([...images, ...newFiles])
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    // Reset input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
    setUploadError("")
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop images here, or{" "}
              <button type="button" onClick={openFileDialog} className="text-blue-600 hover:text-blue-700 underline">
                click to browse
              </button>
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, WebP up to {maxSizeMB}MB each. Max {maxImages} images.
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={openFileDialog}>
            Choose Files
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-sm whitespace-pre-line">
          {uploadError}
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Uploaded Images ({images.length}/{maxImages})
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((file, index) => (
              <ImagePreview key={`${file.name}-${index}`} file={file} onRemove={() => removeImage(index)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface ImagePreviewProps {
  file: File
  onRemove: () => void
}

function ImagePreview({ file, onRemove }: ImagePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useState(() => {
    const url = URL.createObjectURL(file)
    setImageUrl(url)

    // Cleanup URL when component unmounts
    return () => URL.revokeObjectURL(url)
  })

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  return (
    <div className="relative group border rounded-lg overflow-hidden bg-muted/30">
      {/* Remove Button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
        title="Remove image"
      >
        <X className="h-3 w-3" />
      </button>

      {/* Image */}
      <div className="aspect-square relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        )}

        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="h-8 w-8 mb-2" />
            <span className="text-xs">Failed to load</span>
          </div>
        ) : (
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={file.name}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>

      {/* File Info */}
      <div className="p-2 bg-white">
        <p className="text-xs font-medium truncate" title={file.name}>
          {file.name}
        </p>
        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
      </div>
    </div>
  )
}
