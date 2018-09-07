import { Candidata } from "./../../../models/candidata.model";
import { Component, OnInit } from "@angular/core";
import { CandidataService } from "../../../services/candidata/candidata.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ModalUploadService } from "../../../components/modal-upload/modal-upload.service";

@Component({
  selector: "app-candidata",
  templateUrl: "./candidata.component.html"
})
export class CandidataComponent implements OnInit {
  id: string;
  candidata: Candidata;
  candidatas: Candidata[] = [];
  selectedFile: File = null;
  imagenTemp: string;
  constructor(
    public candidataService: CandidataService,
    public routeActivate: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public router: Router
  ) {
    this.routeActivate.params.subscribe(param => {
      console.log("parametro ", param);
      this.id = param["id"];
      if (this.id !== "0") {
        this.candidataService
          .get(this.id)
          .subscribe((candidata: any) => (this.candidata = candidata));
      } else {
        this.candidata = new Candidata(
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          true,
          "0",
          ""
        );
      }
    });
  }
  onFileSeelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    // if (!event) {
    //   this.selectedFile = null;
    //   return;
    // }

    // if (event.type.indexOf("image") < 0) {
    //   //this.toastr.warning('El archivo seleccionado no es una imagen', 'Solo imagenes!');
    //   //swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
    //   alert('seleccione una imagen');
    //   this.selectedFile = null;
    //   return;
    // }
    this.selectedFile = <File>event.target.files[0];
    // this.selectedFile = archivo;

    // let reader = new FileReader();
    // let urlImagenTemp = reader.readAsDataURL(event);
    // console.log(urlImagenTemp);

    // reader.onloadend = () => (this.imagenTemp = reader.result);
  }
  ngOnInit() {}
  save(form?: NgForm) {
    if (this.selectedFile == null) {
      alert("carge una imagen");
      return;
    }
    const fd = new FormData();
    fd.append("foto", this.selectedFile);
    if (form.value.id == "0") {
      this.candidataService.create(form.value).subscribe(res => {
        
        console.log("nuevo", res);
        this.id = res.id;
        this.uploadImage(fd,res.id);
        this.resetForm(form);
       
        //this.router.navigate(['/eleccion/candidatas']);
      });
    } else {
      this.candidataService.update(form.value).subscribe(res => {
        this.uploadImage(fd);
        this.resetForm(form);
        //this.router.navigate(['/eleccion/candidatas']);
      });
    }
    // this.candidataService.uploadImage(this.id, fd).subscribe(
    //   resp => {
    //     console.log(resp);

    //   }
    // );
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
  uploadImage(img: FormData,id?:string) {
    this.candidataService.uploadImage(id, img).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/eleccion/candidatas']);
    });
  }
  cargarFoto() {
    this._modalUploadService.mostrarModal("usuario", this.id);
  }
}
