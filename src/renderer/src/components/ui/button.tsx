import { ark } from '@ark-ui/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, children, type = 'button', ...props }, ref) => {
    const Btn = asChild ? 'button' : ark.button

    return (
      <Btn type={type} ref={ref} {...props} asChild>
        {children}
      </Btn>
    )
  }
)
