declare const M; 
class Main implements ResponseListener{
    public devices: Array<Device> = new Array();
    public framework: FrameWork = new FrameWork();
    private auxId: number
    private auxState: boolean
    constructor() {
        this.framework.consultar(this);
        let nuevo_device = new Device()
        nuevo_device.name="caloventorrrrr"
        nuevo_device.description="liliana"
        nuevo_device.state = 44
        nuevo_device.type = 11

        //this.framework.guardar(nuevo_device, this)
        nuevo_device.id = 5
        //this.framework.modificar(nuevo_device, this)
        //this.framework.eliminar(7, this)
    }
    
    public handlerResponseGet(status: number, response: string) {
        if (status == 200) {
            let resputaString: string = response;
            this.devices = JSON.parse(resputaString);

            let resputa: Array<Device> = JSON.parse(resputaString);
            let cajaDiv = document.getElementById("caja");


            let datosVisuale:string = `<ul class="collection">`
            for (let disp of this.devices) {
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
              <button id="btn_borrar_${disp.id}" class="btn waves-effect waves-light button-view red"><i class="material-icons left">directions_run</i>Eliminar</button>
              <button id="btn_call_modal_${disp.id}" class="btn waves-effect waves-light button-view purple"><i class="material-icons left">directions_run</i>Modificar</button>
              </a>
              </li>`
            }
            datosVisuale += `</ul>`
            cajaDiv.innerHTML = datosVisuale;

            for (let disp of this.devices) {
                let aux: boolean = disp.state !=0? true:false
                
                let checkbox = <HTMLInputElement> document.getElementById("cb_" + disp.id);
                checkbox.addEventListener("click",this)
                checkbox.checked = aux
                let buttonEliminar = document.getElementById("btn_borrar_" + disp.id)
                buttonEliminar.addEventListener("click", this)
                let buttonModificar = document.getElementById("btn_call_modal_" + disp.id)
                buttonModificar.addEventListener("click", this)
            }
          } else {
              alert("Algo salio mal")
          }
    }
    public handlerResponseActualizar(status: number, response: string) {
        if (status == 200) {
            alert("Se actualizo correctamente")    
        } else {
            alert("Error")    
        }
        
    }

    public handlerResponseDelete(status: number, response: string) {
        if (status == 200) {
            alert("Se borro el dispositivo correctamente")    
        } else {
            alert("Error")    
        }
        
    }
    
    public handleEvent(e:Event): void {
        let objetoEvento = <HTMLInputElement>e.target;
        if (e.type == "click" && objetoEvento.id.startsWith("cb_")) {

            console.log("Se hizo click para prender o apagar")
            
            let match:Device
            console.log()

            this.devices.forEach((element, index, array) => {
                if (element.id == parseInt(objetoEvento.id.substring(3))){
                            match = element
                        }
            });
            match.state = (match.state != 0? 0:1)
            this.framework.modificar(match, this)
            var checkbox1 = <HTMLInputElement> document.getElementById("cb_" + match.id)
	        objetoEvento.checked = !objetoEvento.checked
            objetoEvento.checked = true
        }
        else if (e.type == "click" && objetoEvento.id.startsWith("btn_borrar_")) {

            alert("Se hizo click para BORRAR")
            
            let match:Device

            this.devices.forEach((element, index, array) => {
                if (element.id == parseInt(objetoEvento.id.substring(11))){
                            match = element
                        }
            });
            alert(JSON.stringify(match))
            this.framework.eliminar(match.id, this)
        }
        else if (e.type == "click" && objetoEvento.id.startsWith("btn_call_modal_")) {

            alert("Se hizo click para modificar")
            const modal = document.getElementById("modalModificacion")//recupero modal de HTML
            const modalNameField = <HTMLInputElement> document.getElementById("nameFieldModal")
            const modalDescriptionField = <HTMLInputElement> document.getElementById("descriptionFieldModal")
            const modalTypeField =  <HTMLInputElement> document.getElementById("deviceTypeFieldModal")
            var span = <HTMLElement> document.getElementsByClassName("close")[0];
            
            modal.style.display = "block"
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";//hago invisble al span
            }
            
            let match:Device

            this.devices.forEach((element, index, array) => {
                if (element.id == parseInt(objetoEvento.id.substring(15))){
                            match = element
                        }
            });
            alert(JSON.stringify(match))
            modalNameField.value = match.name
            modalDescriptionField.value = match.description
            modalTypeField.value = match.type.toString()
            this.auxId = match.id
            
        }
        else if (e.type == "click" && objetoEvento.id.startsWith("btn_execute_device_info_update")) {

            alert("Se hizo click para confirmar el cambio de dispositivo")
            const modal = document.getElementById("modalModificacion")//recupero modal de HTML
            const modalNameField = <HTMLInputElement> document.getElementById("nameFieldModal")
            const modalDescriptionField = <HTMLInputElement> document.getElementById("descriptionFieldModal")
            const modalTypeField =  <HTMLInputElement> document.getElementById("deviceTypeFieldModal")
            let device: Device = new Device()
            device.id = this.auxId

            device.name = modalNameField.value
            device.description = modalDescriptionField.value
            device.type = parseInt(modalTypeField.value)
            device.state = this.auxState == true ? 1:0

            this.framework.modificar(device, this) 
            modal.style.display = "none"
        }
        else if (e.type == "click" && objetoEvento.id.startsWith("btn_agregar_nuevo")) {
            const nameField = document.getElementById('nameField') as HTMLInputElement | null;
            const descriptionField = document.getElementById('descriptionField') as HTMLInputElement | null;
            const deviceTypeField = document.getElementById('deviceTypeField') as HTMLInputElement | null;

            alert("Se hizo click para AGREGAR NUEVO")
            
            let nuevo_device:Device = new Device()
            nuevo_device.name = nameField.value
            nuevo_device.description = descriptionField.value
            nuevo_device.state = 0
            nuevo_device.type = parseInt(deviceTypeField.value)

            alert(JSON.stringify(nuevo_device))
            this.framework.guardar(nuevo_device, this)
        }
        else if (e.type == "click") {
            
            //alert("Hola " +  this.listaPersonas[0].nombre +" ");    
        } else {
            alert("se hizo doble click en el titulo")
        }
        this.framework.consultar(this);
        const nameField = document.getElementById('nameField') as HTMLInputElement | null;
        const descriptionField = document.getElementById('descriptionField') as HTMLInputElement | null;
        const deviceTypeField = document.getElementById('deviceTypeField') as HTMLInputElement | null;
        nameField.value=""
        descriptionField.value=""
        deviceTypeField.value=null
    }
}

window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,"");
    let btn_agregar = document.getElementById("btn_agregar_nuevo");
    let main: Main = new Main();
    let buttonEjecutarUpdateDevice = document.getElementById("btn_execute_device_info_update")
    
    buttonEjecutarUpdateDevice.addEventListener("click", main)
    btn_agregar.addEventListener("click", main);

});







