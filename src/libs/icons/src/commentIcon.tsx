import { IconProps } from "../Icon.types";

export const CommentIcon = ({
  width = 17,
  height = 16,
  color = "#808080",
  className
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
      className={className}
    >
      <path
        d="M2.73688 12.6317C1.22534 12.6317 0 11.4064 0 9.89486V2.73688C0 1.22534 1.22534 0 2.73688 0H14.1054C15.617 0 16.8423 1.22534 16.8423 2.73688V9.89486C16.8423 11.4064 15.617 12.6317 14.1054 12.6317H9.27379L5.05158 15.7902C4.58604 16.1384 3.92636 16.0433 3.57816 15.5778C3.44203 15.3958 3.36846 15.1746 3.36846 14.9475L3.3678 12.6317H2.73688ZM8.85359 11.3686H14.1054C14.9193 11.3686 15.5791 10.7088 15.5791 9.89486V2.73688C15.5791 1.92297 14.9193 1.26317 14.1054 1.26317H2.73688C1.92297 1.26317 1.26317 1.92297 1.26317 2.73688V9.89486C1.26317 10.7088 1.92297 11.3686 2.73688 11.3686H4.63061L4.63079 12L4.63152 14.527L8.85359 11.3686Z"
        fill={color}
      />
    </svg>
  );
};