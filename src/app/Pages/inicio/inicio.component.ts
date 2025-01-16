import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ClienteService } from '../../Services/cliente.service';
import { Cliente } from '../../Models/Cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private clienteServicio = inject(ClienteService);
  public listaClientes:Cliente[] = [];
  public displayedColumns : string[] = ['numeroIdentificacion','primerNombre','segundoNombre','primerApellido','segundoApellido','telefono','email', 'fechaNacimiento', 'valor','observaciones'];

  obtenerClientes(){
    this.clienteServicio.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaClientes = data;
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
    if(confirm("Desea eliminar el cliente" + objeto.primerNombre)){
      this.clienteServicio.eliminar(objeto.id).subscribe({
        next:(data)=>{
          if(data.isSuccess){
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
  }

}
