import { Dialog as UDialog, Portal as UPortal } from '@ark-ui/react'
import { type HTMLAttributes, type ReactElement, forwardRef } from 'react'

export interface DialogProps extends UDialog.RootProps {
  onCancel?: () => void
}

export const Dialog = forwardRef<HTMLButtonElement, DialogProps>(
  ({ ...props }, ref): ReactElement => {
    return (
      <UDialog.Root {...props}>
        <UDialog.Trigger asChild>
          <button type="button" className="ui-button">
            Open
          </button>
        </UDialog.Trigger>
        <UPortal>
          <UDialog.Backdrop className="ui-dialog-backdrop" />
          <UDialog.Positioner className="ui-dialog-positioner">
            <UDialog.Content className="ui-dialog-content">
              <UDialog.Title className="ui-dialog-title">Dialog Title</UDialog.Title>
              <UDialog.Description className="ui-dialog-description">
                Dialog Description
              </UDialog.Description>
              <UDialog.CloseTrigger ref={ref} onClick={props.onCancel} className="ui-button-text">
                <i className="i-ic-baseline-cancel" /> Close
              </UDialog.CloseTrigger>
            </UDialog.Content>
          </UDialog.Positioner>
        </UPortal>
      </UDialog.Root>
    )
  }
)

export interface ContentProps extends HTMLAttributes<HTMLButtonElement> {
  title?: string
  content?: string
}

export const Content = ({ children, title, content }: ContentProps) => {
  return (
    <UDialog.Content>
      <UDialog.Title className="ui-dialog-title">{title}</UDialog.Title>
      <UDialog.Description className="ui-dialog-description">{content}</UDialog.Description>
      {children}
    </UDialog.Content>
  )
}
