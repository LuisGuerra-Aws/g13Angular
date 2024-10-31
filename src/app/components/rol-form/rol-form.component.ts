import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Rol } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';


@Component({
  selector: 'app-rol-form',
    templateUrl: './rol-form.component.html',
  })

export class RolFormComponent implements OnInit{
  @Input() viewMode = true;

  @Input() rol :  Rol = {
    idRol: 0,
    name: '',
    description:''
  };

  message = '';

  constructor(
    private rolService: RolService, 
    private route: ActivatedRoute,
    private router: Router    
  ){}


  ngOnInit(): void {

    this.message = '';
    const id = this.route.snapshot.params['id'];
    if (id){
      this.editRol(this.route.snapshot.params['id'])
    }
      
  }

  editRol(id : string) : void {
    this.rolService.get(id)
      .subscribe(
        {
          next: (data: Rol) => {
            this.rol = data;
            console.log(data);
          },
          error: (e: any) => console.error(e)
        }
      );
    }


  saveRol(): void{
    this.message = '';

    if (this.rol.idRol)
      this.ejecuteActualizar();
    else
      this.ejecuteInsertar();
  }

  private ejecuteInsertar() {
    const data = {
      name: this.rol.name,
      description: this.rol.description
    };

    this.rolService.save(data).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e: any) => console.error(e)
    });
  }

  private ejecuteActualizar() {
    this.rolService.updatebyid(this.rol.idRol, this.rol)
      .subscribe(
        {
        next: (res: { message: string; }) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This Rol was updated successfully!';
        },
        error: (e: any) => console.error(e)
      }
      );    
  }

  

}




