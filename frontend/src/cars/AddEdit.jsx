import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from 'react-date-picker';


import * as Yup from "yup";

import { carService, alertService } from "@/services";

const AddEdit = ({ history, match }) => {
  const { id } = match.params;
  const isAddMode = !id;
  const [car, setData] = useState({});
  const [date, setDate] = useState(null);

  const validationSchema = Yup.object().shape({
    make: Yup.string().required("Campo requerido"),
    model: Yup.string().required("Campo requerido"),
  });

  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    errors, 
    formState 
  } = useForm({ resolver: yupResolver(validationSchema),});


  const onSubmit = (data) => {
    const params = Object.assign({},data)
    params['estimatedate'] = date ? date.getTime(): null
    isAddMode ? createCar(params) : updateCar(id, params)
  }




  const createCar = (data) => {
    return carService
      .create(data)
      .then(() => {
        alertService.success("Vehículo agregado", { keepAfterRouteChange: true });
        history.push(".");
      }).catch(alertService.error);
  }

  function updateCar(id, data) {
    return carService
      .update(id, data)
      .then(() => {
        alertService.success("Vehículo actualizado", { keepAfterRouteChange: true });
        history.push("..");
      }).catch(alertService.error);
  }

 

  useEffect(() => {
    if (!isAddMode) {
      carService.getById(id).then(({data}) => {
        let cardEdit = data.data
        const fields = ["make", "model", "km", "description", "estimatedate", "inService"];
        fields.forEach((field) => setValue(field, cardEdit[field]));
        setData(cardEdit);
        let estimatedate = Number(cardEdit.estimatedate)
        if(estimatedate  ){
          setDate(new Date (Number(estimatedate)))
        }
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <h1>{isAddMode ? "Agrega un vehículo" : "Edita un vehículo"}</h1>
      <div className="form-row">
        <div className="form-group col-6">
          <label>Marca</label>
          <input
            name="make"
            type="text"
            ref={register}
            className={`form-control ${errors.make ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.make?.message}</div>
        </div>
        <div className="form-group col-6">
          <label>Modelo</label>
          <input
            name="model"
            type="text"
            ref={register}
            className={`form-control ${errors.model ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.model?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-6">
          <label>Kilometros</label>
          <input
            name="km"
            type="number"
            ref={register}
            className={`form-control ${errors.km ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.km?.message}</div>
        </div>
        <div className="form-group col-6">
          <label>Servicio</label>
          <input
            name="description"
            type="text"
            ref={register}
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.description?.message}</div>
        </div>
      </div>


      <div className="form-row">
        <div className="form-group col-6">
          <label>Fecha Estimada</label>
          <DatePicker
              name="estimatedate"
              value={date}
              className="form-control-file"
              onChange={setDate}
              name="startDate"
              dateFormat="MM/dd/yyyy"
          />
          <div className="invalid-feedback">{errors.km?.message}</div>
        </div>


        <div className="form-group col-6">
          <label>En mantenimiento</label>
          <input
            name="inService"
            type="checkbox"
            ref={register}
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
          />
          
          <div className="invalid-feedback">{errors.km?.message}</div>
        </div>
      
      </div>

      <div className="form-row">
        <div className="form-group col-6">
          <label>Fotografía</label>
          {car.image && <div className="image">
                <img src={"http://localhost:8081/public/files/" +car.image} />
            </div>}
          
          <input
            name="image"
            type="file"
            ref={register}
            className={`form-control-file ${errors.image ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.image?.message}</div>
        </div>
      </div>


      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary">
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Guardar
        </button>
        <Link to={isAddMode ? "." : ".."} className="btn btn-link">
          Cancelar
        </Link>
      </div>
    </form>
  );
};

export { AddEdit };
