declare const M; 
class Main {
    public devices: Array<Device> = new Array();
    public framework: FrameWork = new FrameWork();

    constructor() {
        //this.devices = this.framework.consultar()
        this.devices = JSON.parse(this.framework.consultar());
    }

    public handlerResponse(status: number, response: string) {
        if (status == 200) {
            let resputaString: string = response;
            let resputa: Array<Device> = JSON.parse(resputaString);
            let cajaDiv = document.getElementById("caja");


            let datosVisuale:string = `<ul class="collection">`
            for (let disp of resputa) {
                datosVisuale += ` <li class="collection-item avatar">`;
                if (disp.type == 1) {
                    datosVisuale += `<img src="../static/images/lightbulb.png" alt="" class="circle">`;
                } else if (disp.type == 2) {
                    datosVisuale += `<img src="../static/images/window.png" alt="" class="circle">`;
                }
                
                datosVisuale += `<span class="title nombreDisp">${disp.name}</span>
                <p>${disp.description}
                </p>

                <a href="#!" class="secondary-content">
                <div class="switch">
                <label>
                  Off
                  <input type="checkbox" id="cb_${disp.id}">
                  <span class="lever"></span>
                  On
                </label>
              </div>
                </a>
              </li>`
            }
            datosVisuale += `</ul>`
            cajaDiv.innerHTML = datosVisuale;

            for (let disp of resputa) {
                let checkbox = document.getElementById("cb_" + disp.id);
                checkbox.addEventListener("click",this)
            }
        
          } else {
              alert("Algo salio mal")
          }
    }
    handlerResponseActualizar(status: number, response: string) {
        if (status == 200) {
            alert("Se acutlizo correctamente")    
        } else {
            alert("Error")    
        }
        
    }
    public handleEvent(e:Event): void {
        let objetoEvento = <HTMLInputElement>e.target;
      
        if (e.type == "click" && objetoEvento.id.startsWith("cb_")) {

          //  console.log(objetoEvento.id,)
            console.log("Se hizo click para prender o apagar")
            let datos = { "id": objetoEvento.id.substring(3), "state": objetoEvento.checked };
            this.framework.ejecutarRequest("POST","http://localhost:8000/actualizar", this,datos)
            
        }else if (e.type == "click") {
      
            
            //alert("Hola " +  this.listaPersonas[0].nombre +" ");    
        } else {
            alert("se hizo doble click en el titulo")
        }
    }
}

window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,"");

    let btn = document.getElementById("btnSaludar");
    let btn2 = document.getElementById("btnDoble");
    let main: Main = new Main();
    //main.nombre = "Matias"

    btn2.addEventListener("dblclick", main);
    btn.addEventListener("click", main);

});







