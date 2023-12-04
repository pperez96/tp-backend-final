import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurante } from '../model/restaurante';
import { RestauranteService } from '../reserva/services/restaurante.service';
import { MesaService } from '../reserva/services/mesa.service';
import { CategoriaService } from '../service-consumo/categoria.service';
import { ProductoService } from '../service-consumo/producto.service';
import { Mesa } from '../model/mesa';
import { Categoria } from '../model/categoria';
import { Producto } from '../model/producto';
import { DetalleTabla } from '../model/detalle-tabla';
import { Consumo } from '../model/consumo';
import { Detalle } from '../model/detalle';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ConsumoService } from '../service-consumo/consumo.service';
import { Cliente } from '../model/cliente';
import { NgbModal, NgbTypeahead, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ClienteService } from '../reserva/services/cliente.service';
import { CrearClienteComponent } from '../reserva/components/crear-cliente/crear-cliente.component';
import { jsPDF } from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css'],
  styles: [`#ngb-live{display: none;}`]
})
export class ConsumoComponent implements OnInit {

  formDetalleConsumo: FormGroup;
  listRestaurante : Restaurante[];
  listMesa : Mesa[];
  listCategoria : Categoria[];
  listaProducto: Producto[];
  disabled: Boolean = true;
  mesaOcupada : boolean = false;
  mesaNoOcupada: boolean = false;
  id_mesa : number;
  mesa: Mesa;
  listaDetalle: DetalleTabla[] = [];
  detalles: Detalle[];
  isMessage: boolean = false;
  isMessageError: boolean = false;
  message: string;
  consumo: Consumo;
  cliente: Cliente;
  id_cliente: number;
  public clientes: Cliente[];
  productos: Producto[];
  modalRef: NgbModalRef;

  constructor(
    private restauranteService: RestauranteService,
    private mesaService: MesaService,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private productoService : ProductoService,
    private consumoService : ConsumoService,
    private clienteService: ClienteService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.inicializarForm();

    this.restauranteService.getRestaurente().subscribe(data => {
      this.listRestaurante = data;
    });

    this.categoriaService.getCategorias().subscribe(data => {
      this.listCategoria = data;
    });

    this.clienteService.getClientes().subscribe(res => {
      this.clientes = res;
    })

    this.productoService.getProductos().subscribe(res =>{
      this.productos = res;
    })
  }

  private inicializarForm(): void {
    this.formDetalleConsumo = this.formBuilder.group({
      id_categoria: new FormControl('', Validators.required),
      id_producto: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required)
    });
  }

  obtenerMesas(e: Event) {
    this.isMessageError = false;
    this.isMessage = false;
    this.cliente = null;
    this.listaDetalle = [];
    if ( this.disabled ) {
      this.disabled = false;
    }
    let id_restaurante: number = parseInt((e.target as HTMLInputElement).value);
    this.mesaService.getMesa(id_restaurante).subscribe(data => {
      this.listMesa = data;
    });
  }

  verificarConsumo(event: Event) {
    this.isMessageError = false;
    this.isMessage = false;
    this.cliente = null;
    this.id_mesa = parseInt((event.target as HTMLInputElement).value);
    this.consumoService.obtenerConsumo(this.id_mesa).subscribe(data => {
      let json : any = data;
      this.mesaOcupada = json.data ? true : false;
      this.mesaNoOcupada = !this.mesaOcupada;
      this.listaDetalle = [];
      if(this.mesaOcupada){
        this.consumo = data["data"];
        this.cliente = this.clientes.find(x => x.id === this.consumo.id_cliente);
        for(let detalle of this.consumo.detalles){
          var detalle_tabla = new DetalleTabla();
          var producto = this.productos.find(x => x.id === detalle.id_producto);
          detalle_tabla.id = producto.id;
          detalle_tabla.nombre = producto.nombre;
          detalle_tabla.precio = producto.precio;
          detalle_tabla.cantidad = detalle.cantidad;
          detalle_tabla.subtotal = detalle.subtotal;
          detalle_tabla.nuevo = false;
          detalle_tabla.id_detalle = detalle.id;
          this.listaDetalle.push(detalle_tabla)
        }
      }
    });
  }

  onSubmit() {
    let detalleForm  = this.formDetalleConsumo.value;
    this.inicializarForm();

    let prod : Producto[] = this.listaProducto.filter(p => p.id == detalleForm.id_producto);
    const detalle : DetalleTabla = new DetalleTabla();
    detalle.id = prod[0].id;
    detalle.nombre = prod[0].nombre;
    detalle.cantidad = detalleForm.cantidad;
    detalle.precio = prod[0].precio;
    detalle.subtotal = detalle.cantidad * detalle.precio;

    if ( this.listaDetalle.length > 0 ) {
      let flag = false;
      for(let d of this.listaDetalle) {
        if ( d.nombre == detalle.nombre){
          d.cantidad = d.cantidad + detalle.cantidad;
          d.subtotal = d.cantidad * d.precio;
          flag = true;
          break;
        }
      }
      if ( flag == false){
        this.listaDetalle.push(detalle);
      }
    }
    else {
      this.listaDetalle.push(detalle);
    }
  }

  obtenerProductos(e: Event) {
    let id : number = parseInt((e.target as HTMLInputElement).value);
    this.productoService.getProductosPorIdCategoria(id).subscribe(data => {
      this.listaProducto = data;
    });
  }

  guardarConsumo() {
    if(!this.cliente){
      this.isMessageError = true;
      this.message = "No se ha ingresado el cliente.";
      return
    }
    if(this.mesaNoOcupada){
      let consumo : Consumo = new Consumo();
      consumo.fecha_cierre = null;
      consumo.id_cliente = this.cliente.id;
      consumo.id_mesa = this.id_mesa;
      consumo.is_open = true;
      consumo.total = 0;
      consumo.detalles = [];
      for ( let dt of this.listaDetalle ) {
        let detalle : Detalle = new Detalle();
        detalle.id_producto = dt.id;
        detalle.cantidad = dt.cantidad;
        detalle.subtotal = dt.subtotal;
        consumo.total = consumo.total + detalle.subtotal;
        consumo.detalles.push(detalle);
      }
      this.consumoService.agregarConsumo(consumo).subscribe(data => {
        let json : any = data;
        this.isMessage = true;
        this.message = json.mensaje;
        this.listaDetalle = [];
      });
    } else {
      let consumo = this.consumo;
      consumo.id_cliente = this.cliente.id;
      //let detalles_nuevos = this.listaDetalle.filter(x => x.nuevo === true);
      consumo.detalles=[];
      consumo.total = 0;
      for(let dt of this.listaDetalle){
        let detalle : Detalle = new Detalle();
        detalle.id_producto = dt.id;
        detalle.cantidad = dt.cantidad;
        detalle.subtotal = dt.subtotal;
        consumo.total = consumo.total + detalle.subtotal;
        detalle.id = dt.id_detalle;
        consumo.detalles.push(detalle);
      }
      console.log(consumo)
      this.consumoService.actualizarConsumo(consumo).subscribe(data =>{
        let json : any = data;
        this.isMessage = true;
        this.message = json.mensaje;
      })
    }
  }

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  formatter = (cliente: Cliente) => cliente.nombre+' '+cliente.apellido;


  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance));
    const inputFocus$ = this.focus$;
    var cadena;
    cadena = merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.clientes
        : this.clientes.filter(v => (v.nombre+' '+v.apellido).toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
    return cadena;
  }

  crearCliente(){
    const modalRef = this.modalService.open(CrearClienteComponent,{backdrop: 'static'}).result.then(res => {
      this.cliente = res;
      this.clientes.push(this.cliente);
    });
  }

  cerrarConsumo(content) {
    this.consumoService.cerrarConsumo(this.consumo.id).subscribe(json => {
      this.consumo = json.dato;
      this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    });
  }

  generarPDF() {
    const doc = new jsPDF();
    const pdfTable = document.getElementById("information");
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
    this.modalRef.close();
  }

}
