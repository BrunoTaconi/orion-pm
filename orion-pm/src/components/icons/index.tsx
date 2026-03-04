import {
  FiSearch,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronsLeft,
} from "react-icons/fi";
import { HiOutlineBell } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { BsHouse, BsHouseFill } from "react-icons/bs";
import { FaRegStar, FaClock, FaRegClock, FaStar } from "react-icons/fa";
import { MdOutlineSpaceDashboard, MdSpaceDashboard } from "react-icons/md";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi2";
import { AiOutlineProject, AiFillProject } from "react-icons/ai";
import { IoMenu, IoPeopleOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

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

  Menu: ({ size = 18, className }: IconProps) => (
    <IoMenu size={size} className={className} />
  ),

  Collapse: ({ size = 18, className }: IconProps) => (
    <FiChevronsLeft size={size} className={className} />
  ),

  Search: ({ size = 18, className }: IconProps) => (
    <FiSearch size={size} className={className} />
  ),

  Home: ({ size = 18, className, filled }: IconProps) => {
    const Icon = filled ? BsHouseFill : BsHouse;
    return <Icon size={size} className={className} />;
  },

  Recent: ({ size = 18, className, filled }: IconProps) => {
    const Icon = filled ? FaClock : FaRegClock;
    return <Icon size={size} className={className} />;
  },

  Favorite: ({ size = 18, className, filled }: IconProps) => {
    const Icon = filled ? FaStar : FaRegStar;
    return <Icon size={size} className={className} />;
  },

  Dashboard: ({ size = 18, className, filled }: IconProps) => {
    const Icon = filled ? MdSpaceDashboard : MdOutlineSpaceDashboard;
    return <Icon size={size} className={className} />;
  },

  Team: ({ size = 18, className, filled }: IconProps) => {
    const Icon = filled ? HiUserGroup : HiOutlineUserGroup;
    return <Icon size={size} className={className} />;
  },

  Project: ({ size = 18, className, filled }: IconProps) => {
    const Icon = filled ? AiFillProject : AiOutlineProject;
    return <Icon size={size} className={className} />;
  },

  User: ({ size = 18, className, filled }: IconProps) => (
    <FiUser size={size} className={className} />
  ),

  Settings: ({ size = 18, className, filled }: IconProps) => (
    <FiSettings size={size} className={className} />
  ),

  Logout: ({ size = 18, className, filled }: IconProps) => (
    <FiLogOut size={size} className={className} />
  ),

  Bell: ({ size = 20, className, filled }: IconProps) => (
    <HiOutlineBell size={size} className={className} />
  ),

  Add: ({ size = 20, className }: IconProps) => (
    <MdAdd size={size} className={className} />
  ),

  People: ({ size = 20, className }: IconProps) => (
    <IoPeopleOutline size={size} className={className} />
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
