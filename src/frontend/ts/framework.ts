class FrameWork implements Acciones{

  consultar(responseListener:ResponseListener
  ) {
    this.ejecutarRequest("GET", "http://localhost:8000/devices", responseListener)
  }

  guardar(nuevo_device:Device, responseListener:ResponseListener) {
    let URL:string = "http://localhost:8000/devices/"
    this.ejecutarRequest("POST", URL, responseListener, nuevo_device)
  }

  modificar(nuevo_device:Device, responseListener:ResponseListener) {
    let URL:string = "http://localhost:8000/devices/" + nuevo_device.id
    this.ejecutarRequest("PUT", URL, responseListener, nuevo_device)
  }

  eliminar(id:number, responseListener:ResponseListener) {
    let URL:string = "http://localhost:8000/devices/"+id
    this.ejecutarRequest("DELETE", URL, responseListener)
  }
                     
  public ejecutarRequest(metodo: string, url: string, responseListener:ResponseListener, data?:any) {
    let xmlHttp: XMLHttpRequest = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
          if (xmlHttp.readyState == 4) {
            if (metodo == "GET") {
              responseListener.handlerResponseGet(xmlHttp.status, xmlHttp.responseText)
            }
            else if(metodo == "DELETE"){ 
              responseListener.handlerResponseDelete(xmlHttp.status, xmlHttp.responseText)
            }
            else {
              responseListener.handlerResponseActualizar(xmlHttp.status, xmlHttp.responseText)
            } 
          }
    }
   
        xmlHttp.open(metodo, url, true);

        if (metodo == "POST" || "PUT") {
          xmlHttp.setRequestHeader("Content-Type", "application/json")
          xmlHttp.send(JSON.stringify(data))
        } else {
          xmlHttp.send();  
        }

  }
}