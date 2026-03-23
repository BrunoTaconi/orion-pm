"use client";
import React, { ReactNode, useEffect } from "react";
import { Icons } from "../icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  titleSize?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  padding?: string;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  "2xl": "max-w-4xl",
  "3xl": "max-w-6xl",
};

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  titleSize = "text-2xl",
  subtitle,
  showCloseButton = true,
  closeOnOverlayClick = true,
  size = "md",
  padding = "p-8",
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
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* Modal */}
        <div
          className={`bg-bg-primary rounded-xl shadow-xl w-full ${sizeClasses[size]} relative max-h-[90vh] flex flex-col overflow-hidden`}
        >
          <div className={`overflow-y-auto flex-1 w-full h-full ${padding}`}>
            {(title || showCloseButton) && (
              <div className={`flex items-center mb-4 ${headerAlignment}`}>
                {title && (
                  <h2
                    className={`${titleSize} text-text-primary font-semibold`}
                  >
                    {title}
                  </h2>
                )}

                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="text-text-secondary hover:text-text-primary transition cursor-pointer"
                  >
                    <Icons.Close size={16} />
                  </button>
                )}
              </div>
            )}
            {subtitle && (
              <div className={`flex items-center mb-4 ${headerAlignment}`}>
                <h4 className="text-lg text-text-secondary font-normal">
                  {subtitle}
                </h4>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
