import { Injectable } from '@angular/core';
import { of } from "rxjs";
import { Articulo, Articulos } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class MockArticulosService {

  constructor() { }

  get(Nombre: string, Activo: boolean|null, Pagina: number): any {
    let Items = Articulos.filter(item =>
      (Nombre == null || item.Nombre.toUpperCase().includes(Nombre.toUpperCase()))
      && (Activo == null || item.Activo == Activo)
    );
    //ordenar
    Items = Items.sort( (a,b) => a.Nombre.toUpperCase() > b.Nombre.toUpperCase() ? 1 : -1 )
    // paginar con slice
    let RegistrosTotal = Items.length;
    let RegistroDesde = (Pagina - 1) * 10;
    Items = Items.slice(RegistroDesde, RegistroDesde + 10);
    return of({ Items: Items, RegistrosTotal: RegistrosTotal });
  }

  getById(Id: number) {
    let articulo: Articulo = Articulos.filter(item => item.IdArticulo === Id)[0];
    return of(articulo);
  }

  post(obj: Articulo) {
    obj.IdArticulo = new Date().getTime();
   
    obj.IdArticuloFamilia = +obj.IdArticuloFamilia;
    obj.Precio = +obj.Precio;
    obj.Stock = +obj.Stock;
 
    Articulos.push(obj);
    return of(obj);
  }

  put(Id: number, obj: Articulo) {
    let indice: number = 0;
    Articulos.forEach(function(item, index) {
      if (item.IdArticulo === Id) {
        indice = index;
      }
    });
 
    obj.IdArticuloFamilia = +obj.IdArticuloFamilia;
    obj.Precio = +obj.Precio;
    obj.Stock = +obj.Stock;
 
    Articulos[indice] = obj;
    return of(obj);
  }

}
