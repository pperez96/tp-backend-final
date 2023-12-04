import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();
  constructor(private clienteService: ClienteService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  guardar(){
    if(!(this.cliente.cedula&&this.cliente.nombre&&this.cliente.apellido)) return;
    this.clienteService.crear(this.cliente).subscribe((res)=>{
      console.log(res);
      this.cliente = res.dato;
      this.activeModal.close(this.cliente);
      return res;
    })
  }

  salir(){
    this.activeModal.close(null)
  }

}
