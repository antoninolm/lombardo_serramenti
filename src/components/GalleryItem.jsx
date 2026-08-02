import useScrollReveal from '../hooks/useScrollReveal'

export default function GalleryItem({ src, alt, eager = false }) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`aspect-[3/4] overflow-hidden bg-iron-800 transition duration-700 ease-out motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} className="h-full w-full object-cover" />
    </div>
  )
}
