import React, { FC, PropsWithChildren } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { PlusIcon } from '@radix-ui/react-icons'
import s from './tooltip.module.css'

interface Props extends PropsWithChildren {
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip: FC<Props> = ({ side, content, children }) => {
  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className={s.TooltipContent}
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow className={s.TooltipArrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
