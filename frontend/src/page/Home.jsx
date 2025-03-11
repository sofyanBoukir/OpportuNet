import { useSelector } from "react-redux";
import { userSelector } from "../store/Store";

export const Home = () => {
  const selector = useSelector(userSelector);

  return (
    <div className="text-black">{JSON.stringify(selector)}hhhhhhhhhhhhhh</div>
  );
};
