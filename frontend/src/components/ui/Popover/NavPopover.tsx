import { Popover, type PopoverProps, Text } from '@mantine/core'

interface NavPopoverProps extends Partial<PopoverProps> {
   targetElement?: React.ReactNode
   content?: React.ReactNode
}

const NavPopover = ({
   targetElement = 'Toggle popover',
   content = 'This is uncontrolled popover, it is opened when button is clicked',
   width = 'target',
   position = 'bottom',
   withArrow = true,
   shadow = 'md',
   ...props
}: NavPopoverProps) => {
   return (
      <Popover width={width} position={position} withArrow={withArrow} shadow={shadow} {...props}>
         <Popover.Target>{targetElement}</Popover.Target>
         <Popover.Dropdown>{content}</Popover.Dropdown>
      </Popover>
   )
}

export default NavPopover
