import { DatePipe } from '@angular/common';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';
import { Reserva } from 'src/app/model/reserva';
import { Cliente } from '../../../model/cliente';
import { Restaurante } from '../../../model/restaurante';
import { ClienteService } from '../../services/cliente.service';
import { ReservaService } from '../../services/reserva.service';
import { RestauranteService } from '../../services/restaurante.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-filtro-lista-reservas',
  templateUrl: './filtro-lista-reservas.component.html',
  styleUrls: ['./filtro-lista-reservas.component.css']
})
export class FiltroListaReservasComponent implements OnInit {
  model: NgbDateStruct;

  public listaRestaurantes: Restaurante[];
  public listaClientes: Cliente[];
  public filtrarReservaForm: FormGroup;

  constructor(
    private router: Router,
    private restauranteService: RestauranteService,
    private clienteService: ClienteService,
    private datepipe: DatePipe
  ) {
    this.filtrarReservaForm = new FormGroup({
      idRestaurante: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      cedulaCliente: new FormControl(''),
    });
  }


  ngOnInit(): void {
    this.restauranteService.getRestaurente().subscribe(
      data => {
        this.listaRestaurantes = data;
        this.clienteService.getClientes().subscribe(
          data =>{
            this.listaClientes = data;
          }
        )
      }
    )
  }

  onSubmit(): void{
    let restaurante = this.filtrarReservaForm.value.idRestaurante
    let fecha = this.filtrarReservaForm.value.fecha
    let cliente = this.filtrarReservaForm.value.cedulaCliente
    fecha = new Date(fecha.year,fecha.month-1,fecha.day).toISOString().slice(0, 10);
    this.router.navigate(['/listar-reserva-filtrado/'],{queryParams: {idRestaurante: restaurante, fecha: fecha, cedulaCliente: cliente}})
  }

}
