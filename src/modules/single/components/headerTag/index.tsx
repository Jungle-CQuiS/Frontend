import { HeaderTag } from "./styled";

interface HeaderTagComponentProps {
  type: "객관식" | "주관식" | "타임어택";
}

export const HeaderTagComponent = ({ type }: HeaderTagComponentProps) => {
  return <HeaderTag>{type}</HeaderTag>;
};
