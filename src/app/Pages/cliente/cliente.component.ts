import { Component, Input, OnInit, inject } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { ClienteService } from '../../Services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../Models/Cliente';



@Component({
  selector: 'app-cliente',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

  @Input('id') id! : number;
  private clienteServicio = inject(ClienteService);
  public formBuild = inject(FormBuilder);

  public formCliente:FormGroup = this.formBuild.group({
    numero_Identificacion: [''],
    primer_Nombre: [''],
    segundo_Nombre: [''],
    primer_Apellido: [''],
    segundo_Apellido: [''],
    telefono: [''],
    email:[''],
    fecha_nacimiento: [''],
    valor_Estimado_Seguro:[''],
    observaciones:['']
  });

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.id != 0){
      this.clienteServicio.obtener(this.id).subscribe({
        next:(data) =>{
          this.formCliente.patchValue({
            numero_Identificacion: data.numero_Identificacion,
            primer_Nombre: data.primer_Nombre,
            segundo_Nombre: data.segundo_Nombre,
            primer_Apellido: data.primer_Apellido,
            segundo_Apellido: data.segundo_Apellido,
            telefono: data.telefono,
            email:data.email,
            fecha_nacimiento: data.fecha_nacimiento,
            valor_Estimado_Seguro: data.valor_Estimado_Seguro,
            observaciones: data.observaciones
          })
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }

guardar(){
  const objeto : Cliente = {
    id : this.id,
    numero_Identificacion: this.formCliente.value.numero_Identificacion,
    primer_Nombre: this.formCliente.value.primer_Nombre,
    segundo_Nombre: this.formCliente.value.segundo_Nombre,
    primer_Apellido: this.formCliente.value.primer_Apellido,
    segundo_Apellido: this.formCliente.value.segundo_Apellido,
    telefono: this.formCliente.value.telefono,
    email:this.formCliente.value.email,
    fecha_nacimiento: this.formCliente.value.fecha_nacimiento,
    valor_Estimado_Seguro: this.formCliente.value.valor_Estimado_Seguro,
    observaciones: this.formCliente.value.observaciones,
   
  }

  if(this.id == 0){
    this.clienteServicio.crear(objeto).subscribe({
      next:(data) =>{
        if(data.isSuccess){
          alert("Cliente creado!");
          this.router.navigate(["/"]);
        }else{
          alert("Error al crear")
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }else{
    this.clienteServicio.editar(objeto).subscribe({
      next:(data) =>{
        if(data.isSuccess){
          alert("Cambios guardados!");
          this.router.navigate(["/"]);
        }else{
          alert("Error al editar")
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }


}

volver(){
  this.router.navigate(["/"]);
}


}
