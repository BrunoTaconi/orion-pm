import {
  FiSearch,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiClock,
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { HiOutlineBell } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BsHouse, BsHouseFill } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi2";
import { AiOutlineProject } from "react-icons/ai";
import { AiFillProject } from "react-icons/ai";

type IconProps = {
  size?: number;
  className?: string;
  filled?: boolean;
};

type LetterIconProps = {
  text: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
  className?: string;
};

const LetterIcon = ({
  text,
  size = 32,
  bgColor = "bg-gray-200",
  textColor = "white",
  className = "",
}: LetterIconProps) => {
  const letter = text?.charAt(0).toUpperCase();

  return (
    <div
      className={`
                flex items-center justify-center
                rounded-sm font-semibold
                ${bgColor}
                ${textColor}
                ${className}
                `}
      style={{
        width: size,
        height: size,
      }}
    >
      {letter}
    </div>
  );
};

export const Icons = {
  /* ================= NORMAL ICONS ================= */

  Search: ({ size = 20, className }: IconProps) => (
    <FiSearch size={size} className={className} />
  ),

  Home: ({ size = 20, className, filled }: IconProps) => {
    const Icon = filled ? BsHouseFill : BsHouse;
    return <Icon size={size} className={className} />;
  },

  Recent: ({ size = 20, className, filled }: IconProps) => {
    const Icon = filled ? FaClock : FaRegClock;
    return <Icon size={size} className={className} />;
  },

  Favorite: ({ size = 20, className, filled }: IconProps) => {
    const Icon = filled ? FaStar : FaRegStar;
    return <Icon size={size} className={className} />;
  },

  Dashboard: ({ size = 20, className, filled }: IconProps) => {
    const Icon = filled ? MdSpaceDashboard : MdOutlineSpaceDashboard;
    return <Icon size={size} className={className} />;
  },

  Team: ({ size = 20, className, filled }: IconProps) => {
    const Icon = filled ? HiUserGroup : HiOutlineUserGroup;
    return <Icon size={size} className={className} />;
  },

  Project: ({ size = 20, className, filled }: IconProps) => {
    const Icon = filled ? AiFillProject : AiOutlineProject;
    return <Icon size={size} className={className} />;
  },

  User: ({ size = 20, className, filled }: IconProps) => (
    <FiUser size={size} className={className} />
  ),

  Settings: ({ size = 20, className, filled }: IconProps) => (
    <FiSettings size={size} className={className} />
  ),

  Logout: ({ size = 20, className, filled }: IconProps) => (
    <FiLogOut size={size} className={className} />
  ),

  Bell: ({ size = 20, className, filled }: IconProps) => (
    <HiOutlineBell size={size} className={className} />
  ),

  Google: ({ size = 20, className }: IconProps) => (
    <FcGoogle size={size} className={className} />
  ),

  Github: ({ size = 18, className }: IconProps) => (
    <SiGithub size={size} className={className} />
  ),
};

/* ================= DYNAMIC ICONS ================= */

export const DynamicIcons = {
  Letter: (props: LetterIconProps) => <LetterIcon {...props} />,
};
