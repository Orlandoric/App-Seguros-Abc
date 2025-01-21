import { OnInit, Component, inject, ViewChild } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule, MatTableDataSource,} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ClienteService } from '../../Services/cliente.service';
import { Cliente } from '../../Models/Cliente';
import { Router } from '@angular/router';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';



@Component({
  selector: 'app-inicio',
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule,MatPaginator,MatPaginatorModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  private clienteServicio = inject(ClienteService);
  public listaClientes:Cliente[] = [];
  public displayedColumns : string[] = ['numero_Identificacion','primer_Nombre','segundo_Nombre','primer_Apellido','segundo_Apellido','telefono','email', 'fecha_nacimiento', 'valor_Estimado_Seguro','observaciones','accion'];
  
  //paginacion
  listaClienteDs = new MatTableDataSource<Cliente>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes(){
    this.clienteServicio.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaClientes = data;
          this.listaClienteDs = new MatTableDataSource<Cliente>(data);
          this.listaClienteDs.paginator = this.paginator;
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){

    this.obtenerClientes();
  }

  nuevo(){
    this.router.navigate(['/cliente',0]);
  }

  editar(objeto:Cliente){
    this.router.navigate(['/cliente',objeto.id]);
  }
  eliminar(objeto:Cliente){
    if(confirm("Desea eliminar el cliente: " + objeto.primer_Nombre)){
      this.clienteServicio.eliminar(objeto.id).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            alert("Registro eliminado")
            this.obtenerClientes();
          }else{
            alert("no se pudo eliminar")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
    location.reload();
  }


}
