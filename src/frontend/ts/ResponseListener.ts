interface ResponseListener{

    handlerResponseGet(status: number, response: string);
    handlerResponseActualizar(status:number,response:string);
    handlerResponseDelete(status:number,response:string);
}