"use client";
import React, { ReactNode, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  showCloseButton = true,
  closeOnOverlayClick = true,
  size = "md",
}: ModalProps) => {
  const headerAlignment = showCloseButton
    ? "justify-between"
    : "justify-center";

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[rgb(60_60_74/0.6)] backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Wrapper centralizador */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Modal */}
        <div
          className={`bg-bg-primary rounded-xl shadow-xl w-full ${sizeClasses[size]} p-8 relative`}
        >
          {(title || showCloseButton) && (
            <div className={`flex items-center mb-2 ${headerAlignment}`}>
              {title && <h2 className="text-2xl text-text-primary font-semibold">{title}</h2>}

              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary transition cursor-pointer"
                >
                  <IoIosClose size={26} />
                </button>
              )}
            </div>
          )}
          {subtitle && (
            <div className={`flex items-center mb-4 ${headerAlignment}`}>
              <h4 className="text-lg text-text-secondary font-normal">{subtitle}</h4>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
