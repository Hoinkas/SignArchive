import './MediaPlayer.css'
import { SignFile } from '@shared/types'
import { useEffect, useRef, useState } from 'react'

interface MediaPlayerProps {
  file: SignFile
}

function MediaPlayer({ file }: MediaPlayerProps): React.JSX.Element {
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

  const src = `media://${file.path}`
  const isImage = file.mimeType.startsWith('image/')

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
