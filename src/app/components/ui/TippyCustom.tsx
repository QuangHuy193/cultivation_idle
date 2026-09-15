import Tippy from "@tippy.js/react";
import { InfoIcon } from "lucide-react";
import React from "react";

interface TippyCustomProps {
  content: string;
  btn?: React.ReactElement;
  trigger?: "click" | "mouseenter";
}

const TippyCustom = ({
  content,
  btn = <InfoIcon className="text-gray-500" />,
  trigger = "click",
}: TippyCustomProps) => {
  return (
    <Tippy trigger={trigger} content={content} arrow={true}>
      {btn}
    </Tippy>
  );
};

export default TippyCustom;
