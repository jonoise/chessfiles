import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

export function BlurImage(props: ImageProps) {
  const [loading, setLoading] = useState(true)
  const [src, setSrc] = useState(props.src)
  useEffect(() => setSrc(props.src), [props.src]) // update the `src` value when the `prop.src` value changes

  return (
    <Image
      {...props}
      src={src}
      alt={props.alt}
      className={`${props.className} ${
        loading ? 'blur-sm grayscale' : 'blur-0 grayscale-0'
      }`}
      onLoadingComplete={async () => {
        setLoading(false)
      }}
    />
  )
}
