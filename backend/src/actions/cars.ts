import { Action  } from "actionhero"
import { add, all, remove, get, edit } from "../modules/car"
import { safeFile } from "../tools/files";

export class AddCars extends Action {
  constructor() {
    super()
    this.name = "add.car"
    this.description = "Add a new Car"
    this.outputExample = {
    }
    this.inputs = {
      description: {
        required: false,
      },
      make: {
        required: true,
      }, 
      model: {
        required: true,
      },
      estimatedate: {
        required: false,
        formatter: (param)=>  Number(param)
      },
      image: {
        required: false,
        formatter: (param)=> param !== "undefined" ? param: null
      },
      km : {
        required: false,
        formatter: (param)=>  Number(param)
      },
      inService : {
        required: false,
        default: false,
        formatter: (param)=>  param === 'true'
      }
    }
  }
  async run(data) {
    try {
      const {params} = data

      let newCar =  Object.assign({}, params)

      if(params.image){
        const fileName = params.image.name
        const tempPath =  params.image.path;
        try {
          newCar.image = await safeFile(tempPath, fileName)
        } catch (error) {
          data.response.error = error
        }
      }

      data.response.data = await add(newCar)
    } catch (error) {
     data.response.error = error
    }
  }
}


export class GetCars extends Action {
  constructor() {
    super()
    this.name = "get.cars"
    this.description = "Get cars list"
    this.outputExample = {
    }
    this.inputs = {}
  }
  async run(data) {
    try {
      data.response.data = await all()
    } catch (error) {
      data.response.error = error
    }
  }
}


export class DeleteCar extends Action {
  constructor() {
    super()
    this.name = "delete.car"
    this.description = "Get cars list"
    this.outputExample = {
    }
    this.inputs = {
      id : {
        required: true,
      }
    }
  }
  async run(data) {
    try {
      data.response.data = await remove(data.params.id)
    } catch (error) {
      data.response.error = error
    }
  }
}


export class GetCar extends Action {
  constructor() {
    super()
    this.name = "get.car"
    this.description = "Get car"
    this.outputExample = {
    }
    this.inputs = {
      id : {
        required: false,
      }
    }
  }
  async run(data) {
    try {
      data.response.data = await get(data.params.id)
    } catch (error) {
      data.response.error = error
    }
    
  }
}


export class EditCar extends Action {
  constructor() {
    super()
    this.name = "edit.car"
    this.description = "Update a car detailsx"
    this.outputExample = {
    }
    this.inputs = {
      id : {
        required: true,
      },
      description: {
        required: false,
      },
      make: {
        required: false,
      }, 
      model: {
        required: false,
      },
      estimatedate: {
        required: false,
        formatter: (param)=>  Number(param)
      },
      image: {
        required: false,
        formatter: (param)=> param !== "undefined" ? param: null
      },
      km : {
        required: false,
        formatter: (param)=>  Number(param),
      },
      inService : {
        required: false,
        formatter: (param)=>  param === 'true'
      }
    }
  }
  async run(data) {
    try {

      let newCar =  Object.assign({}, data.params)

      if(data.params.image){
        const fileName = data.params.image.name
        const tempPath =  data.params.image.path;
        try {
          newCar.image = await safeFile(tempPath, fileName)
        } catch (error) {
          data.response.error = error
        }
      }
      

      data.response.data = await edit(data.params.id, newCar)
    } catch (error) {
      data.response.error = error
    }
    
  }
}