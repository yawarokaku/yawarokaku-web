import React from 'react'

type InfiniteScrollBoxProps = {
  children: React.ReactNode
  className?: string
}

export default function InfiniteScrollBox({
  children,
  className,
}: InfiniteScrollBoxProps): React.JSX.Element {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const contentRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current

    if (!container || !content) return

    // 前後にスクロール可能にするためにコンテンツを3倍に複製
    content.innerHTML =
      content.innerHTML + content.innerHTML + content.innerHTML
    // 真ん中から開始
    container.scrollTop = content.scrollHeight / 3

    const handleScroll = () => {
      const scrollHeight = content.scrollHeight
      const third = scrollHeight / 3

      if (container.scrollTop < third / 2) {
        container.scrollTop += third
      } else if (container.scrollTop > third * 1.5) {
        container.scrollTop -= third
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`overflow-y-scroll h-40 border ${className ?? ''}`}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  )
}
