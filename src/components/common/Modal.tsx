'use client'

import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  ariaLabel?: string
  closeOnOverlay?: boolean
  style?: React.CSSProperties
}

const Modal = ({
  isOpen,
  onClose,
  children,
  ariaLabel = 'dialog',
  closeOnOverlay = true,
  style,
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  const mount = typeof window !== 'undefined' ? document.body : null
  if (!isOpen || !mount) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!closeOnOverlay) return
    if (e.target === overlayRef.current) onClose()
  }

  return createPortal(
    <Overlay ref={overlayRef} onMouseDown={handleOverlayClick}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </Dialog>
    </Overlay>,
    mount
  )
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(16, 16, 16, 0.45);
  display: grid;
  place-items: center;
  z-index: 1000;
  animation: fadeIn 150ms ease-out;
  @keyframes fadeIn {
    from { opacity: 0 } to { opacity: 1 }
  }
`

const Dialog = styled.div`
  width: min(560px, 92vw);
  max-height: 86vh;
  overflow: auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 10px 40px rgba(0,0,0,.25);
  padding: 20px 20px 16px;
  animation: scaleIn 160ms ease-out;
  @keyframes scaleIn {
    from { transform: scale(.96); opacity: .96 } to { transform: scale(1); opacity: 1 }
  }
`

export default Modal