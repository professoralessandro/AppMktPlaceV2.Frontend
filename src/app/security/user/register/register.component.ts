import { Component, OnInit } from '@angular/core';
import { QueryParameter } from 'src/app/models/query-parameter';
import { TipoDocumentoEnum } from 'src/app/Enums/tipo-documento.enum';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { FileUploadRequest } from './file-upload-request';
import { RegisterUserRequest } from './register-user-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // IMAGE ATTRIBUTTES
  public selectedFile: File;
  // public previewUrl: string | ArrayBuffer | null = null;
  public previewUrl: string | ArrayBuffer | null = null;
  public fileModel: FileUploadRequest;

  // USER ATRIBUTTES
  public model: RegisterUserRequest;
  public replayPassWord: string;
  public title: string;
  public titleButton: string;
  public parameters: QueryParameter[];
  private loginRoute: string;
  public sexoOptions: string[];
  public estadoCivilOptions: string[];

  public documentTypes = Object.values(TipoDocumentoEnum).filter(c => typeof (c) == 'string');
  public documentTypesString: string[] = [];

  constructor(
    private service: HttpCommonService,
    private commonService: CommonService,
    private loaderService: LoaderService
  ) { }

  /**
   * PUBLIC METHOD
   */
  ngOnInit(): void {
    this.loaderService.SetLoaderState(true);
    this.initializeComponent();
    this.loaderService.SetLoaderState(false);
  }

  public async incluir() {
    this.loaderService.SetLoaderState(true);
    if (this.validateRegisterUserRequest(this.model)) {
      // IMAGE UPLOAD
      this.fileModel.title = this.selectedFile.name;
      this.fileModel.description = 'profile image :' + this.model.email;
      this.fileModel.mainFile = true;
      this.fileModel.public = true;
      // BASE 64
      this.fileModel.profileImage = this.previewUrl;

      // USER INSERT
      this.model.estadoCivil = this.ReturnEstadoCivil(this.model.estadoCivil);
      this.model.sexo = this.ReturnSexo(this.model.sexo);
      this.model.tipoDocumento = this.ReturnDocumentType(this.model.tipoDocumento);
      this.model.groupName = 'User';
      this.service.insert('security_url', 'user/register', this.model)
        .toPromise()
        .then(c => {
          this.fileModel.externalReferenceId = c.jsonObject.identifier;
          this.service.insert('storage_url', 'storagefile/post-profile-image', this.fileModel)
            .toPromise()
            .then(() => {
              this.commonService.responseActionWithNavigation
                (this.loginRoute, `Usuario cadastrado com sucesso.<br>você receberá um email na sua caixa de mensagem<br>com as instruções para ativar a sua conta.`, true);
            })
            .catch(e => {
              this.loaderService.SetLoaderState(false);
              this.commonService.ReturnModalMessagErrorSuccess("Houve um erro ao cadastrar o usuario.", false);
            });
        })
        .catch(e => {
          this.loaderService.SetLoaderState(false);
          this.commonService.ReturnModalMessagErrorSuccess("Houve um erro ao cadastrar o usuario.", false);
        });
    }
    else {
      this.loaderService.SetLoaderState(false);
      return;
    }
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  publiconUpload(): void {
    if (this.selectedFile) {
      // Aqui você pode adicionar a lógica para enviar a imagem para o servidor
      console.log('Imagem selecionada:', this.selectedFile);
    } else {
      console.log('Nenhuma imagem selecionada.');
    }
  }

  /**
   * PRIVATE METHOD
   */
  private initializeComponent(): void {
    // REGISTER USER
    this.model = new RegisterUserRequest();
    this.replayPassWord = '';
    this.sexoOptions = ['Masculino', 'Feminino', 'Outros'];
    this.estadoCivilOptions = ['Solteiro(a)', 'Casado(a)', 'Outros'];
    this.loginRoute = 'login';
    this.parameters = [];
    this.title = 'Cadastrar usuário';
    this.titleButton = 'Cadastrar';

    // IMAGE ATRIBUTTES
    this.fileModel = new FileUploadRequest();
  }

  private ReturnSexo(value: string): string {
    if (value === 'Masculino') {
      return 'M';
    } else if (value === 'Feminino') {
      return 'F';
    } else {
      return 'O';
    }
  }

  private ReturnEstadoCivil(value: string): string {
    if (value === 'Solteiro(a)') {
      return 'ST';
    } else if (value === 'Casado(a)') {
      return 'CS';
    } else {
      return 'OT';
    }
  }

  private ReturnDocumentType(value): TipoDocumentoEnum {
    if (value === 'RG') {
      return TipoDocumentoEnum.RG;
    }
    else if (value === 'CNPJ') {
      return TipoDocumentoEnum.CNPJ;
    }
    else {
      return TipoDocumentoEnum.CPF;
    }
  }

  private ReturnDPcumentType(value): string {
    if (value == TipoDocumentoEnum.RG) {
      return "RG";
    } else if (value == TipoDocumentoEnum.CPF) {
      return "CPF";
    } else if (value == TipoDocumentoEnum.CPF) {
      return "CNPJ";
    }
  }

  private ReturnEstadoCivilDescription(value: String): string {
    if (value.toUpperCase() === 'ST') {
      return 'Solteiro(a)';
    } else if (value.toUpperCase() == 'CS') {
      return 'Casado(a)';
    } else {
      return "Outros";
    }
  }

  private ReturnSexoDescription(value: String): string {
    if (value.toUpperCase() === 'F') {
      return 'Feminino';
    } else if (value.toUpperCase() == 'M') {
      return 'Masculino';
    } else {
      return "Outros";
    }
  }

  private validateRegisterUserRequest(user: RegisterUserRequest): boolean {
    
    // VALIDATE IMAGE
    if(this.commonService.isNullOrUndefined(this.selectedFile)) {
      this.commonService.ReturnModalMessagErrorSuccess("A imagem de perfil deve ser selecionada.", false);
      return false;
    }

    // VALIDATE IF USER IS MORE OLDER THAN 120 YEARS
    if (this.commonService.returnYearsByDateString(user.dataNascimento) < 18 && this.commonService.returnYearsByDateString(user.dataNascimento) > 120) {
      this.commonService.ReturnModalMessagErrorSuccess("O usuário deve ter entre 18 e 120 anos.", false);
      return false;
    }

    // VALIDATE PASSWORD
    if (user.password != this.replayPassWord) {
      this.commonService.ReturnModalMessagErrorSuccess("As senhas devem ser iguais.", false);
      return false;
    }

    if (!this.commonService.validatePassword(user.password)) {
      return false;
    }

    // VALIDATE EMAIL
    if (this.commonService.validatedEmail(user.email)) {
      return false;
    }

    // VALIDATE NOME
    if (user.nome.length < 6 && user.nome.length > 100) {
      this.commonService.ReturnModalMessagErrorSuccess("O nome deve ter entre 6 e 100 caracteres.", false);
      return false;
    }

    // VALIDATE USER NAME
    if (user.nome.length < 5 && user.nome.length > 50) {
      this.commonService.ReturnModalMessagErrorSuccess("O nome de usuário deve ter entre 5 e 50 caracteres.", false);
      return false;
    }

    // VALIDATE DOCUMENT NUMBER
    if (user.nmrDocumento.length < 6 && user.nmrDocumento.length > 15) {
      this.commonService.ReturnModalMessagErrorSuccess("O numero do documento deve ter entre 6 e 15 caracteres.", false);
      return false;
    }

    // VALIDATE PHONE NUMBER
    if (user.nmrDocumento.length < 8 && user.nmrDocumento.length > 15) {
      this.commonService.ReturnModalMessagErrorSuccess("O numero de telefone deve ter entre 8 e 15 caracteres.", false);
      return false;
    }

    // VALIDATE PHONE NUMBER
    if (this.commonService.isNullOrUndefined(user.estadoCivil) || user.estadoCivil === '') {
      this.commonService.ReturnModalMessagErrorSuccess("O estado civil deve ser informado.", false);
      return false;
    }

    // VALIDATE PHONE NUMBER
    if (this.commonService.isNullOrUndefined(user.sexo) || user.sexo === '') {
      this.commonService.ReturnModalMessagErrorSuccess("O sexo deve ser informado.", false);
      return false;
    }

    // VALIDATE PHONE NUMBER
    if (this.commonService.isNullOrUndefined(user.tipoDocumento) || user.tipoDocumento === '') {
      this.commonService.ReturnModalMessagErrorSuccess("O tipo de documento deve ser informado.", false);
      return false;
    }

    return true;
  }
}
