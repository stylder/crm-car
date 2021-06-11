import moment from "moment";
moment.locale('es');


export const getTodate = unixdate => 
    (unixdate !== "null") ? moment(new Date()).to(Number(unixdate)) : ''
