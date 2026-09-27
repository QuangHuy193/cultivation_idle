"use client";

import { ReactNode, useState } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
  type Placement,
} from "@floating-ui/react";
import { InfoIcon } from "lucide-react";
import { FloatingPortal } from "@floating-ui/react";

interface TooltipCustomProps {
  content: ReactNode;
  btn?: ReactNode;
  trigger?: "click" | "hover";
  placement?: Placement;
}

const TooltipCustom = ({
  content,
  btn = <InfoIcon className="text-gray-500" />,
  trigger = "click",
  placement = "bottom",
}: TooltipCustomProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null);

  const [floatingEl, setFloatingEl] = useState<HTMLDivElement | null>(null);

  const { floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,

    elements: {
      reference: referenceEl,
      floating: floatingEl,
    },

    placement,

    whileElementsMounted: autoUpdate,

    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });

  const click = useClick(context, {
    enabled: trigger === "click",
  });

  const hover = useHover(context, {
    enabled: trigger === "hover",
    move: false,
  });

  const dismiss = useDismiss(context);

  const role = useRole(context, {
    role: "tooltip",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    dismiss,
    role,
  ]);

  return (
    <>
      <span
        ref={setReferenceEl}
        {...getReferenceProps()}
        className="inline-flex cursor-pointer"
      >
        {btn}
      </span>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={setFloatingEl}
            style={floatingStyles}
            {...getFloatingProps()}
            className="
        relative z-999
        rounded-[10px]
        bg-[#B8862F]
        p-1
        shadow-xl
      "
          >
            <div
              className="
          rounded-[7px]
          bg-linear-to-b
          from-[#FFF7D6]
          to-[#FEF0C0]
          px-3 py-2
          text-[13px]
          font-medium
          text-[#4A2C12]
        "
            >
              {content}
            </div>

            <div className="..." />
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default TooltipCustom;
