import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/service/localstorage.service';
import { ProductosService } from 'src/app/service/productos.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  categorias: any[] = [];
  productos: any[] = [];
  valorP: any[] = [];
  p: any[] = [];
  img: string = 'https://assets.compramass.com/products/';

 productosMostrar: any[]= [];

  constructor(private productosService: ProductosService, private router: Router, private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.getTodo();
    this.Storage();
  }

  getTodo(){
    let filtro: any
    this.productosService.getTodo().subscribe(data => {
      this.categorias = data.categories;
      // console.log(this.categorias);
      this.productos = data.products;
      this.categoriasO();
      this.productosO();

      let cat: any = this.categorias
      let cat1: any;
      
      cat.forEach(element => {
        cat1 = element.id;
        // console.log('cat',cat1)
        let array1: any[] = [];
        filtro = this.getAll(cat1);
        let p: any
        
        filtro.forEach(element2 => {
          let kind1: string = '-80@3x.jpg';
          let kind2: string = '@3x.jpg';
          let extension: any
          if(element2.product_data.kind == 1){
            extension = kind1
          }else{
            extension = kind2
          }

          let imagen: any
          this.productosService.getimg(element2.product_data.ean, extension).subscribe(data => {
          },
          error => {
            imagen = error.url
            // console.log(imagen);
            
            p = {
              'ordinal': element2.product_data.categories[0].ordinal,
              'nombre': element2.product_data.name,
              'precio': element2.product_data.price,
              'cantidad': element2.product_data.stock,
              'imagen': imagen,
              'categoria': element
            }
            array1.push(p);
            array1 = array1.sort((a, b) => {
              return a.ordinal - b.ordinal;
            });
          }
          )
        });

        let productos: any = {
          'ordinal': element.ordinal,
          'nombre': element.name,
          'productos': array1
        }
        this.productosMostrar.push(productos);
      });
      //  console.log('ult',this.productosMostrar)
    })
  }
  
  categoriasO(){
    this.categorias.sort(function(a,b){
      return a.id - b.id 
    });
  }

  productosO(){
    this.productos.sort(function(a,b){
      return a.product_data.id - b.product_data.id 
    });
  }

  getAll(idCategoria: any){
    let producto = this.productos.filter((producto) => producto.product_data.categories[0].category_id === idCategoria)
    return  producto;
  }

  Storage(){
    let token = this.localstorageService.cacheGet('token')
    if(token == null || token == undefined){
      this.router.navigate(['/home']);
    }
  }
}
