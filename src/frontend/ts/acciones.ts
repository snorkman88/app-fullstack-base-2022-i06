interface Acciones{

  consultar(responseListener:ResponseListener, id?: number);
  guardar(device:Device, responseListener:ResponseListener);
  modificar(device:Device, responseListener:ResponseListener);
  eliminar(id: number, responseListener:ResponseListener);

}