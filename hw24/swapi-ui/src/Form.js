function Form() {
  return (
    <form>
      <div className="input-group input-group-sm mb-3">
        <span className="swapi-link input-group-text" id="inputGroup-sizing-sm">https://www.swapi.tech/api/</span>
        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="vechile/19" />
        <button className="btn btn-primary">Search</button>
      </div>
    </form>
  );
}

export default Form;
