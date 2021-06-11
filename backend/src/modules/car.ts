import { api } from "actionhero"
import { UUID } from "../tools/uuid"

const redis = api.redis.clients.client

const postPrefix = "cars"


export async function add(car) {
  const key = UUID()
  const data = {
    key,
    description: car.description,
    make: car.make,
    model: car.model,
    km: car.km,
    image: car.image,
    inService: car.inService,
    estimatedate: car.estimatedate,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  }

  await redis.hset(postPrefix, key , JSON.stringify(data))
}

export async function all() {
    try {
        const dataCars = await redis.hgetall(postPrefix)
        return await Object.keys(dataCars).map((k) => JSON.parse(dataCars[k]))
    } catch (error) {
        return error
    }
}


export async function remove(id) {
    try {
        const isRemove  =  await redis.hdel(postPrefix, id )
        return isRemove 
    } catch (error) {
        return error
    }
}


export async function get(id) {
    try {
        return JSON.parse(await redis.hget(postPrefix, id))
    } catch (error) {
        return error
    }
}


export async function edit(key, params) {
    try {
        const car = await get(key);
        let newData = {
            key,
            description: params.description || car.description ,
            make: params.make || car.make,
            model: params.model || car.model,
            image: params.image ||  car.image,
            inService: params.inService,
            km: params.km || car.km,
            estimatedate: params.estimatedate || car.estimatedate,
            createdAt: car.createdAt,
            updatedAt: new Date().getTime(),
        }
        return await redis.hset(postPrefix, key , JSON.stringify(newData));
    } catch (error) {
        return error
    }
}


