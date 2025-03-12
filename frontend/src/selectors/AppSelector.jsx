import { useSelector } from "react-redux";

export const AppSelector = () => {
  const data = useSelector((state) => state);
  return data;
};
