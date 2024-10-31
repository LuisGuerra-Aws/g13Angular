import { Component, OnInit } from '@angular/core';

import { Rol } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';



@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol_list.component.css'],
})

export class RolListComponent implements OnInit{

  roles?: Rol[];
  selected?: Rol ={};
  currentIndex: number = -1;
  title : string = '';
  message : string = '';

  constructor( private rolService: RolService){
  }


  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.rolService.getAll()
      .subscribe( {
        next : (data) => {
          this.roles = data;
          console.log(data);
        },
        error : (e: any) => console.error(e)
      }
              );
  }

  refreshList(): void{
    this.getRoles();
    this.selected = {};
    this.currentIndex = -1;
  }

  setSelected(rol: Rol, index: number): void{
      this.selected = rol;
      console.log(rol);
      this.currentIndex = index;
  }

  deleteRol() : void {
    if (!this.selected) {
      return;
    }

    this.message = '';

    this.rolService.delete(this.selected.idRol)
      .subscribe({
        next : (res: any) => {
          console.log(res);
          this.refreshList();
        },
        error: (e: any) => console.error()
      }
        );
  }

  updatebyId() : void {
    if (!this.selected) {
      return;
    }

    const data = { 
      name : this.selected.name,
      description : this.selected.description
     };

     this.message = '';

     this.rolService.updatebyid(this.selected.idRol, data)
     .subscribe({
      next : (res: any) => {
        console.log(res);
        this.refreshList();
      },
      error: (e: any) => console.error()
    }
      );

  }


}
