import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentDecorator, Injectable } from '@angular/core';
import { HttpClientUtils } from './http-client-utils';
import {MessageService} from 'primeng/api';
import { Button } from 'primeng/button';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [MessageService]

})
@Injectable()
export class UserInfoComponent{


  addSingle() {
      this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }

  addMultiple() {
      this.messageService.addAll([{severity:'success', summary:'Service Message', detail:'Via MessageService'},
                                  {severity:'info', summary:'Info Message', detail:'Via MessageService'}]);
  }

  clear() {
      this.messageService.clear();
      this.uploadedFiles = [];
  }

  uploadedFiles: any[] = [];

    onUpload(event: { files: any; }) {
        for(let file of event.files) {
            // this.uploadedFiles.push(file);
        }
        
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    myUploader(event: { files: any; }) {
      for(let file of event.files) {
        if (file) {

          this.fileName = file.name;
      
          const formData = new FormData();
      
          formData.append("avatar", file);
      
          const upload$ = this.http.post<ResponseData>("/u/avatar", formData);
      
          upload$.subscribe(
            resp=>{
              if(resp && resp.data ){
                let imageElement = document.querySelector("#p-avatar-img div img");
                // let imageElement = document.getElementById("avatar_image");
                if(imageElement){
                  let image = (<HTMLImageElement>imageElement);
                  if(image.src != resp.data){
                    image.src = "/b/avatar/" + resp.data;
                    this.userInfo.avatar = resp.data;
                  }
                }
              }
            }
          );
        }
        // this.uploadedFiles.push(file);
      }
      
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
 
  changeInputFile(){
    let afile = <HTMLInputElement>document.getElementById("avatarFile");
    let file = afile.files![0];
    let selectButtonSpan = <HTMLSpanElement>document.querySelector("#selectFile span.mdc-button__label");
    selectButtonSpan.innerHTML = file.name;
  }
  avatarFileClick(){
    var afile = document.getElementById("avatarFile");
    afile?.click();
  }

  async upAvatar() {
  var afile = document.getElementById("avatarFile");
  // console.log(afile)
  // if(!afile) return;
  let files = (<HTMLInputElement>afile).files;
  if (!files) return;
  let file = files[0];
  console.log(file.name)
  
  if (file) {
    if(this.fileName === file.name) return;
    if(file.size > 1024*1024) {
      const config = {
        file: file,
        maxSize: 1024
    };
    const resizedImageFile = await resizeImage(config);
    if(resizedImageFile){
      console.log(resizedImageFile);
      let newFile = blobToFile(<Blob>resizedImageFile,file.name);
      if(newFile){
        file = newFile;
      }else{
        this.messageService.add({severity: 'info', summary: '文件大小不能超过1M', detail: ''});
        return;
      }
    }
      // return;
    }

    
    this.fileName = file.name;

    const formData = new FormData();

    formData.append("avatar", file);

    const upload$ = this.http.post<ResponseData>("/u/avatar", formData);

    upload$.subscribe(
      resp=>{
        if(resp && resp.data ){
          let imageElement = document.querySelector("#p-avatar-img div img");
          // let imageElement = document.getElementById("avatar_image");
          if(imageElement){
            let image = (<HTMLImageElement>imageElement);
            image.src = "/b/avatar/" + resp.data;
            this.userInfo.avatar = resp.data;
            console.log("id:" + resp.data)
            this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
          }
        }
      }
    );
}
}
saveUserinfo() {
  console.log("ss")
  
  const result = this.httpClientUtils.saveUserInfo(this.userInfo);
  console.log(result);
}
sendEmailCode(){
  let passwordInput = <HTMLInputElement>document.querySelector("input[name=password]");
  let checkPassword = <HTMLInputElement>document.querySelector("input[name=checkPassword]");
  let pvalue = passwordInput.value;
  let cvalue = checkPassword.value;
  if(!pvalue || pvalue.length < 6){
    this.messageService.add({severity: 'warn', summary: '密码不能为空切长度大于等于6', detail: ''});
    return;
  }
  if(!cvalue){
    this.messageService.add({severity: 'warn', summary: '确认密码为空', detail: ''});
    return;
  }
  if(cvalue !== pvalue){
    this.messageService.add({severity: 'warn', summary: '两次输入密码不一致', detail: ''});
    return
  }


  let sendData = {
    bussinessType: "3"
  }

  this.httpClientUtils.getPostRequest(
    "/b/v/sendVEmail?businessType=3",
    {},
    {}
  ).subscribe(
    resp=>{
      if(resp){
        if(resp.success){
          this.messageService.add({severity: 'success', summary: "成功发送", detail: ''});
          setButtoneDistable("sendEmailCodeButton",60);
        }else{
          this.messageService.add({severity: 'warn', summary: resp.msg, detail: ''});
        }
      }
    }
  )
  
}
changePassword(){
  console.log("changePassword");
  console.log(this.account.passowrd);
  let passwordInput = <HTMLInputElement>document.querySelector("input[name=password]");
  let checkPassword = <HTMLInputElement>document.querySelector("input[name=checkPassword]");
  let emailCode = <HTMLInputElement>document.querySelector("input[name=emailCode]");
  let pvalue = passwordInput.value;
  let cvalue = checkPassword.value;
  if(!pvalue || pvalue.length < 6){
    this.messageService.add({severity: 'warn', summary: '密码不能为空切长度大于等于6', detail: ''});
    return;
  }
  if(!cvalue){
    this.messageService.add({severity: 'warn', summary: '确认密码为空', detail: ''});
    return;
  }
  if(cvalue !== pvalue){
    this.messageService.add({severity: 'warn', summary: '两次输入密码不一致', detail: ''});
    return
  }
  if(!emailCode.value || emailCode.value.length < 4){
    this.messageService.add({severity: 'warn', summary: '邮箱验证码错误', detail: ''});
    return;
  }
  let changeInfo = {password:pvalue,emailCode:emailCode.value};
  let postHeaders = {
    "Content-Type": "application/json"
}
  this.httpClientUtils.getPostRequest("/u/change/password",JSON.stringify(changeInfo),postHeaders).subscribe(
    resp=>{
      if(resp){
        if(resp.success){
          this.messageService.add({severity: 'success', summary: "修改成功", detail: ''});
          return;
        }else{
          this.messageService.add({severity: 'error', summary: resp.msg, detail: ''});
          return;
        }
      }
      this.messageService.add({severity: 'error', summary: "未知错误", detail: ''});
    }
  )
}
fileName="";


getThisUser():UserInfo{
  return this.userInfo;
}
  constructor(
    private httpClientUtils: HttpClientUtils,
    private http: HttpClient,
    private messageService: MessageService,
  ) {
   }
  userInfo?:any;
  account?:any;
  ngOnInit(): void {

    this.account = {
      email: "null",
      password: "",
      checkPassword: ""
    }

    this.httpClientUtils.getUserInfo().subscribe(
      responseData =>{
        this.userInfo = responseData.data;
        this.account = {
          email: this.userInfo.email,
          password: "",
          checkPassword: ""
        }
        if(this.userInfo.avatar){
          let imageElement = document.querySelector("#p-avatar-img div img");
                // let imageElement = document.getElementById("avatar_image");
                if(imageElement){
                  let image = (<HTMLImageElement>imageElement);
                  if(image.src != this.userInfo.avatar){
                    image.src = "/b/avatar/" + this.userInfo.avatar;
                  }
                }
        }
      }
    );
    // this.userInfo  = this.httpClientUtils.getUserInfo();
    console.log(1);
    console.log(this.userInfo);
    console.log(2);
    if(!this.userInfo){
      this.userInfo = getUserInfo().data;
    }
    if(!this.account){
      this.account = {
        email: this.userInfo.email,
        password: "",
        checkPassword: ""
      }
    }
    // const data = getUserInfo();
    // const data = reponse.data;
  }

  
}

export interface Account {
 email:string;
 password:string;
 checkPassword:string;
 emailCode:string;
}

export interface UserInfo {
    name:string;
    id:number;
    birthday:Date;
    birthplace:string;
    birthprovince:string;
    birthcity:string;
    firstname?:string;
    lastname:string;
    sex:number;
    age:number;
    avatar:string;
    country:string;
    city:string;
    address:string;
    profession:string;
    bindWeixin:string;
    bindGithub:string;
    bindPhone:string;
    bindEmail:string;
    bindIphone:string;
    nameAuthentication:string;
    credit:string;
    performanceScore:string;
}

export interface ResponseData {
  status:number;
  msg:string;
  data:any;
  success:boolean;
  otherInfo:string;
}

function getUserInfo():ResponseData {
  // throw new Error('Function not implemented.');
  const data = {
    status:200,
    msg:"ok",
    data:{
      name:"",
      id:1,
      birthplace:"",
      birthprovince:"",
      birthcity:"",
      firstname:"",
      lastname:"",
      // sex:1,
      // age:28,
    },
    success:true,
    otherInfo:"string",
  };
  return data;
  // httpClientUtils.getUserInfo();
  // const resp = 
}

function setButtoneDistable(id: string, seconds: number) {
  let button = <HTMLButtonElement>document.getElementById(id);
  button.setAttribute("disabled","")
  let lableSpna = <HTMLSpanElement>document.querySelector("#"+id +  " .mdc-button__label");
  let lableOriginValue = lableSpna.innerHTML;

  lableSpna.innerHTML = lableOriginValue + "("+seconds+"s)";
  setTimeoutButton(button,lableSpna,lableOriginValue,seconds);
}

function setTimeoutButton(button:HTMLButtonElement,target:HTMLSpanElement,value:string,seconds:number){
  if(seconds > 0){
    seconds --;
    target.innerHTML = value + "("+seconds+"s)";
    setTimeout(() => {
      setTimeoutButton(button,target,value,seconds)
    }, 1000);
  }else{
    target.innerHTML = value;
    button.removeAttribute("disabled");
  }
}

interface IResizeImageOptions {
  maxSize: number;
  file: File;
}

const resizeImage = (settings: IResizeImageOptions) => {
  const file = settings.file;
  const maxSize = settings.maxSize;
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement('canvas');
  const dataURItoBlob = (dataURI: string) => {
    const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
        atob(dataURI.split(',')[1]) :
        unescape(dataURI.split(',')[1]);
    const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const max = bytes.length;
    const ia = new Uint8Array(max);
    for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
    return new Blob([ia], {type:mime});
  };
  const resize = () => {
    let width = image.width;
    let height = image.height;

    if (width > height) {
        if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
        }
    } else {
        if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
        }
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d')!.drawImage(image, 0, 0, width, height);
    let dataUrl = canvas.toDataURL('image/jpeg');
    return dataURItoBlob(dataUrl);
  };

  return new Promise((ok, no) => {
      if (!file.type.match(/image.*/)) {
        no(new Error("Not an image"));
        return;
      }

      reader.onload = (readerEvent: any) => {
        image.onload = () => ok(resize());
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
  })    
};

const blobToFile = (theBlob: Blob, fileName:string): File => {
  var b: any = theBlob;
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  //Cast to a File() type
  var file = new File([theBlob],fileName, {lastModified: new Date().getTime()});
  return file;
}