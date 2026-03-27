import './MediaPlayer.css'
import { MediaFile } from '@shared/types'
import { useEffect, useRef, useState } from 'react'

interface MediaPlayerProps {
  mediaFile: MediaFile
}

function MediaPlayer({ mediaFile }: MediaPlayerProps): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1
    })
    if (wrapperRef.current) observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    return () => {
      if (video) {
        video.pause()
        video.src = ''
        video.load()
      }
    }
  }, [])

  const getSrc = (filePath: string): string => {
    if (!filePath) return ''
    if (filePath.startsWith('file:///')) {
      const path = decodeURIComponent(filePath.replace('file://', ''))
      return 'media://' + path.split('/').map(encodeURIComponent).join('/')
    }
    const withoutLeadingSlash = filePath.replace(/^\//, '')
    return 'media://' + withoutLeadingSlash.split('/').map(encodeURIComponent).join('/')
  }

  const isImage = ['jpg', 'png'].includes(mediaFile.fileType)
  const src = getSrc(mediaFile.filePath)

  return (
    <div className="mediaWrapper" ref={wrapperRef}>
      {isVisible &&
        (isImage ? (
          <img src={src} className="imageBox" />
        ) : (
          <video ref={videoRef} src={src} className="videoBox" controls preload="metadata" muted />
        ))}
    </div>
  )
}

export default MediaPlayer
