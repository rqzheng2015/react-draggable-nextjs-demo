'use client'
import Draggable from 'react-draggable'
import { useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import { DRAGGABLE_BORDER_WIDTH } from '@/app/utils/constant'

const INITIAL_FOOTER_HEIHGT = 250
const MINIMUM_FOOTER_HEIGHT = 100
const TITLE_BAR_HEIGHT = 32
const EXPAND_SVG = '/ide/footer/expand.svg'
const COLLAPSE_SVG = '/ide/footer/collapse.svg'

const TITLE_NAME = 'Footer bar'

interface IFooterBarProps {}

export default function FooterBar(props: IFooterBarProps) {
  const [height, setHeight] = useState(INITIAL_FOOTER_HEIHGT)
  const [lastHeight, setLastHeight] = useState(INITIAL_FOOTER_HEIHGT)
  const [footerPosition, setFooterPosition] = useState({ x: 0, y: 0 })
  const footerNodeRef = useRef(null)

  const isMinFooterHeight = useMemo(() => {
    return height <= TITLE_BAR_HEIGHT
  }, [height])

  return (
    <div className="w-full flex flex-col bg-transparent relative">
      <div
        className={`h-[4px] flex absolute right-0 bottom-[250px] left-0 flex-col bg-transparent`}
      >
        <Draggable
          axis="y"
          nodeRef={footerNodeRef}
          position={footerPosition}
          bounds={{ bottom: INITIAL_FOOTER_HEIHGT - TITLE_BAR_HEIGHT }}
          onDrag={(e, data) => {
            const newHeight = INITIAL_FOOTER_HEIHGT - data.y
            setFooterPosition({ x: 0, y: data.y })
            setHeight(newHeight)
          }}
        >
          <div
            ref={footerNodeRef}
            className={`w-full cursor-ns-resize bg-transparent hover:bg-gray-400 h-[${DRAGGABLE_BORDER_WIDTH}px]`}
          ></div>
        </Draggable>
      </div>
      <div
        style={{ height: `${height}px` }}
        className={`w-full flex flex-col bg-white border-t-[1px]`}
      >
        <div
          className={`h-[32px] w-full flex items-center px-[12px] border-b-[1px] justify-between`}
        >
          <p className={'text-title text-[14px] font-bold select-none'}>{TITLE_NAME}</p>
          <div
            className={
              'cursor-pointer w-[32px] h-[32px] flex align-center justify-center select-none'
            }
            onClick={() => {
              if (isMinFooterHeight) {
                // 展开逻辑，在展开时恢复原有的高度
                // 为了防止上次折叠时高度太低，展开效果不佳，限制一个展开高度的最小值
                // Expand logic, restore the original height when expanding
                // To prevent the height from being too low since last collapsed, which might cause the expansion effect is not good,
                // we add a limit of minimum expansion height here.
                let finalHeight =
                  lastHeight < MINIMUM_FOOTER_HEIGHT ? MINIMUM_FOOTER_HEIGHT : lastHeight
                setLastHeight(finalHeight)
                setHeight(finalHeight)
                setFooterPosition({ x: 0, y: INITIAL_FOOTER_HEIHGT - finalHeight })
              } else {
                // 收起逻辑
                // 保存在收起前的高度，用于展开时恢复高度
                // Collapse logic
                // Save the height before collapsing, and use it to restore the height when expanding
                setLastHeight(height)
                setHeight(TITLE_BAR_HEIGHT)
                setFooterPosition({ x: 0, y: INITIAL_FOOTER_HEIHGT - TITLE_BAR_HEIGHT })
              }
            }}
          >
            {isMinFooterHeight ? (
              <Image width={20} height={20} src={EXPAND_SVG} alt={'Expand'} />
            ) : (
              <Image width={20} height={20} src={COLLAPSE_SVG} alt={'Collapse'} />
            )}
          </div>
        </div>
        <div className={'flex-1 w-full flex'}>
          <div className={'flex-1 w-full h-full p-[12px]'}>This is the footer content</div>
        </div>
      </div>
    </div>
  )
}
