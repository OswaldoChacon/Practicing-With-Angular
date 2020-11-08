import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formRegistro = this.formBuilder.group({
    nombre: ['', [Validators.required, this.validadorService.ValorEspecifico], [this.validadorService.checkIfEmailExists()]],
    apellidos: ['', [Validators.required]],
    fecha_nacimiento: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmarPassword: ['', [Validators.required]],
    array: this.formBuilder.array([])
  }, {
    validators: this.validadorService.confirmarPassword
  }
  )

  constructor(private formBuilder: FormBuilder,
    private validadorService: ValidadoresService
  ) { }

  ngOnInit(): void {    
  }

  registrarme() {
    this.formRegistro.reset();
  }

  get arrayControl() {
    return <FormArray>this.formRegistro.get('array');
  }

  agregarFormControl() {
    this.arrayControl.push(this.crearFormControl());
  }

  eliminarFormControl(indice: number) {
    this.arrayControl.removeAt(indice);
  }

  crearFormControl() {    
    return this.formBuilder.control('', [Validators.required])
  }

  get nombre() {
    return this.formRegistro.get('nombre');
  }

  get apellidos() {
    return this.formRegistro.get('apellidos');
  }

  get password() {
    return this.formRegistro.get('password');
  }

  get confirmarPassword() {
    return this.formRegistro.get('confirmarPassword');
  }

}
