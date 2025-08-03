import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchSwapiData } from "../redux/slice/swapiSlice";

function Form() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      dispatch(fetchSwapiData(input.trim()));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group input-group-sm mb-3">
        <span className="swapi-link input-group-text">https://www.swapi.tech/api/</span>
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="vehicles/19"
        />
        <button className="btn btn-primary">Search</button>
      </div>
    </form>
  );
}

export default Form;
