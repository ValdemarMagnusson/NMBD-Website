import type { ReactNode } from "react";
import {
  FaBuromobelexperte,
  FaHammer,
  FaLeaf,
  FaPlus,
} from "react-icons/fa";
import { GiBrickWall, GiConcreteBag } from "react-icons/gi";

export type Service = {
  id: number;
  icon: ReactNode;
  backgroundImage: string;
};

const serviceData: Service[] = [
  {
    id: 1,
    icon: <FaBuromobelexperte />,
    backgroundImage: "svc-stenlaggning.jpg",
  },
  {
    id: 2,
    icon: <GiBrickWall />,
    backgroundImage: "svc-betong.jpg",
  },
  {
    id: 3,
    icon: <FaLeaf />,
    backgroundImage: "svc-tradgard.jpg",
  },
  {
    id: 4,
    icon: <GiConcreteBag />,
    backgroundImage: "svc-murning.jpg",
  },
  {
    id: 5,
    icon: <FaHammer />,
    backgroundImage: "svc-renovering.jpg",
  },
  {
    id: 6,
    icon: <FaPlus />,
    backgroundImage: "svc-ovrigt.jpg",
  },
];

export default serviceData;
