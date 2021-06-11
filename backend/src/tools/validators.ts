
export const numberValidator = (param) => {
    if (!Number.isInteger(param)) {
        throw new Error("No es un valor valido");
    }
}