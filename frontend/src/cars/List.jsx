import React, { useState, useEffect } from "react";
import config from 'config';
import { Link } from "react-router-dom";
import {getTodate} from "../services/date.service";
import { carService } from "@/services";

const List = ({ match }) => {
  const { path } = match;
  const [loanding, setLoanding] = useState(true);
  const [cars, setCars] = useState([]);


  useEffect(() => updateList() , []);

  const deleteUser = (id) => carService.remove(id).then(() => updateList());


  const updateList = () => {
    setLoanding(true)
    carService
    .getAll()
    .then(({ data }) => setCars(data.data))
    .finally(() => setLoanding(false));
  }

  const onErrorImage = (e) => {
    e.target.onerror = null; 
    e.target.src="../../assets/list/notfound.png"
  }

  const row = (car) => (
      <tr key={car.key}  className={`${car.inService ? 'table-success': ''}`}>
        <th scope="row">
          <div className="d-flex align-items-center">
            <img
              className="rounded-circle"
              src={`${config.apiUrl}/public/files/${car.image}`}
              onError={onErrorImage}
              height="40"
              width="40"
            />
          </div>
        </th>
        <td>{car.make}</td>
        <td>{car.model}</td>
        <td>{car.km}</td>
        <td>{getTodate(car.estimatedate)}</td>
        <td>
          <Link
            to={`${path}/edit/${car.key}`}
            className="btn btn-sm btn-primary mr-1"
          >
            Editar
          </Link>
          <button
                    onClick={() => deleteUser(car.key)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    disabled={car.isDeleting}
                  >
                    {car.isDeleting ? 
                    (<span className="spinner-border spinner-border-sm"></span>) 
                    : (<span>Eliminar</span>)}
                  </button>
        </td>
      </tr>
    );

  return (
    <div>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Marca</th>
            <th scope="col">Modelo</th>
            <th scope="col">Kilometros</th>
            <th scope="col">Fecha Estimada</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => row(car))}

          {loanding && (
            <tr>
              <td colSpan="12" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}

          {!loanding && !cars.length && (
            <tr>
              <td colSpan="12" className="text-center">
                <div className="p-2">Sin registros</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { List };
