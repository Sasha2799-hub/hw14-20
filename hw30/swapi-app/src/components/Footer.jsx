import { useDispatch } from "react-redux";
import { clearItems } from "../redux/slice/swapiSlice";

const Footer = () => {
  const dispatch = useDispatch();
  return (
    <button className="btn btn-danger mt-3" onClick={() => dispatch(clearItems())}>
      Clear
    </button>
  );
};

export default Footer;
