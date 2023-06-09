import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export function NewAd() {
  const [categories, setCategory] = useState([]);
  const [hibas, setHibas] = useState("");
  const hibaRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:5000/api/kategoriak')
      .then((data => data.json()))
      .then(data => setCategory(data));
  }, [])
  return (
    <div className="container">
      <h2 className="mb-4 text-center">Új hirdetés elküldése</h2>
      <form className="row" onSubmit={(e) => {
        e.preventDefault();
        const ujIngatlan = {
          kategoriaId: Number(e.target.elements.kategoriaId.value),
          leiras: e.target.elements.leiras.value,
          hirdetesDatuma: e.target.elements.hirdetesDatuma.value,
          tehermentes: e.target.elements.tehermentes.checked,
          kepUrl: e.target.elements.kepUrl.value
        }

        const response = fetch(`http://localhost:5000/api/ujingatlan`, {
          method: 'POST',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(ujIngatlan),
        })
          .then(response => {
            if (response.status === 200) {
              navigate("/offers")
            } else {
              setHibas(response.statusText)
            }
          })
          .catch(err => {
            setHibas(err.message);
          })
      }
      }>
        <div className="offset-lg-3 offset-md-2 col-lg-6 col-md-8 col-12">
          <div className="mb-3">
            <label for="category" className="form-label">Ingatlan kategóriája</label>
            <select class="form-select" name="kategoriaId">
              <option value="0">Kérem válasszon</option>
              {categories.map((category) => (
                <option value={category.id}>{category.megnevezes}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label for="date" className="form-label">Hirdetés dátuma</label>
            <input type="date" className="form-control" name="hirdetesDatuma" readOnly={true} value={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="mb-3">
            <label for="description" className="form-label">Ingatlan leírása</label>
            <textarea className="form-control" name="leiras" rows="3"></textarea>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" name="tehermentes" defaultChecked="true" />
            <label className="form-check-label" for="creditFree">Tehermentes ingatlan</label>
          </div>
          <div className="mb-3">
            <label for="pictureUrl" className="form-label">Fénykép az ingatlanról</label>
            <input type="url" className="form-control" name="kepUrl" />
          </div>
          <div className="mb-3 text-center">
            <button className="btn btn-primary px-5">Küldés</button>
          </div>

          {hibas &&
            <div className="alert alert-danger alert-dismissible" role="alert">
              <strong ref={hibaRef}>{hibas}</strong>
              <button type="button" className="btn-close" onClick={() => setHibas("")}></button>
            </div>
          }

        </div>
      </form>
    </div>
  )
}