import {
  CheckCircle2Icon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";

type TCalloutType = "info" | "warning" | "danger" | "success";

export type TCalloutProps = {
  className?: string;
  iconClassName?: string;
  type: TCalloutType;
  iconSize?: string | number;
  children: React.ReactNode;
};

const Callout = ({
  className = "",
  iconClassName = "",
  type,
  iconSize = "2rem",
  children,
}: TCalloutProps) => {
  const calloutTypeMetaMap: {
    [key in TCalloutType]: {
      borderColor?: string;
      backgroundColor?: string;
      textColor?: string;
      icon: React.ReactNode;
    };
  } = {
    info: {
      borderColor: "border-blue-700",
      backgroundColor: "bg-blue-50",
      textColor: "text-blue-700",
      icon: <InfoIcon size={iconSize} strokeWidth={3} />,
    },
    warning: {
      borderColor: "border-yellow-700",
      backgroundColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      icon: <TriangleAlertIcon size={iconSize} strokeWidth={3} />,
    },
    danger: {
      borderColor: "border-red-700",
      backgroundColor: "bg-red-50",
      textColor: "text-red-700",
      icon: <OctagonXIcon size={iconSize} strokeWidth={3} />,
    },
    success: {
      borderColor: "border-green-700",
      backgroundColor: "bg-green-50",
      textColor: "text-green-700",
      icon: <CheckCircle2Icon size={iconSize} strokeWidth={3} />,
    },
  };

  const metaMap = calloutTypeMetaMap[type];
  const { borderColor, backgroundColor, textColor, icon } = metaMap;

  return (
    <div
      className={`mb-[1.6rem] flex items-center gap-x-[1.6rem] rounded-[0.8rem] border-[0.15rem] border-solid px-[1.6rem] py-[1.8rem] ${borderColor} ${backgroundColor} ${textColor} ${className}`}
    >
      <span className={`${textColor} ${iconClassName}`}>{icon}</span>
      <div className="font-pretendard text-[1.6rem] font-medium">
        {children}
      </div>
    </div>
  );
};

export default Callout;
