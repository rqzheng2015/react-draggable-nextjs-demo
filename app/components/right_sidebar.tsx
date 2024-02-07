'use client'
import Draggable from 'react-draggable'
import { useState, useRef } from 'react'
import { DRAGGABLE_BORDER_WIDTH } from '@/app/utils/constant'

const INITIAL_SIDEBAR_WIDTH = 400
const MINIMUM_SIDEBAR_WIDTH = 200

interface IRightSidebarProps {}

export default function RightSidebar(props: IRightSidebarProps) {
  const [width, setWidth] = useState(INITIAL_SIDEBAR_WIDTH)
  const nodeRef = useRef(null)
  return (
    <div className="h-full flex flex-col bg-transparent relative">
      <div className={`w-[4px] flex absolute right-[400px] bottom-0 top-0 bg-transparent`}>
        <Draggable
          axis="x"
          nodeRef={nodeRef}
          bounds={{ right: INITIAL_SIDEBAR_WIDTH - MINIMUM_SIDEBAR_WIDTH }}
          onDrag={(e, data) => {
            const newWidth = INITIAL_SIDEBAR_WIDTH - data.x
            setWidth(newWidth)
          }}
        >
          <div
            ref={nodeRef}
            className={`h-full cursor-ew-resize bg-transparent hover:bg-gray-400 w-[${DRAGGABLE_BORDER_WIDTH}px]`}
          ></div>
        </Draggable>
      </div>
      <div
        style={{ width: `${width}px` }}
        className={`h-full flex flex-col border-l-[1px] bg-white p-[12px]`}
      >
        This is the right sidebar.
      </div>
    </div>
  )
}
