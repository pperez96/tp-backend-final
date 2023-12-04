export class Reserva {
  id: number
  id_restaurante: number
  id_mesa:number
  fecha:string
  rango_hora:string
  id_cliente: number
  cantidad_solicitada: number

  tostring(){
    return `${this.id_restaurante} ${this.id_mesa} ${this.fecha} ${this.rango_hora} ${this.id_cliente} ${this.cantidad_solicitada}`
  }
}
