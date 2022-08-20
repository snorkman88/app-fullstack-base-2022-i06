class FrameWork implements Acciones, ResponseListener{
  xmlHttp : XMLHttpRequest
  constructor(){
    this.xmlHttp = new XMLHttpRequest();
  }
    

  handlerResponse(status: number, response: string) {
  }
  handlerResponseActualizar(status: number, response: string) {
    //throw new Error("Method not implemented.");
  }

  consultar(
  ):string {
    //TODO manejar los datos de 'result'. Convertir la lista de JSON en 
    //instancias de Device
    let a: Array<Device> = new Array()
    return JSON.stringify(this.ejecutarRequest("GET", "http://localhost:8000/devices", this))
    
  }
  guardar(): string {
    throw new Error("Method not implemented.");
  }
  modificar(): string {
    throw new Error("Method not implemented.");
  }
  eliminar(): string {
    throw new Error("Method not implemented.");
  }
                     
  public ejecutarRequest(metodo: string, url: string, lister:ResponseListener, data?:any):string {
    let xmlHttp: XMLHttpRequest = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
          if (xmlHttp.readyState == 4) {
            if (metodo == "GET") {
              return xmlHttp.responseText
              //lister.handlerResponse(xmlHttp.status, xmlHttp.responseText)
            } else {
              lister.handlerResponseActualizar(xmlHttp.status,xmlHttp.responseText)
              return "blah"
            }
            }
            return "jaja"
    }
    return "jaja"

   
//        xmlHttp.open(metodo, url, true);
//        if (metodo == "POST") {
//          xmlHttp.setRequestHeader("Content-Type", "application/json")
//          xmlHttp.send(JSON.stringify(data))
//        } else {
//          xmlHttp.send();  
//        }
    
        
     
  }
}