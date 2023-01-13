import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { HttpClientUtils } from './http-client-utils';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
@Injectable()
export class UserInfoComponent{
upAvatar() {
  var afile = document.getElementById("avatarFile");
  // console.log(afile)
  // if(!afile) return;
  let files = (<HTMLInputElement>afile).files;
  if (!files) return;
  let file = files[0];
  console.log(file.name)

  if (file) {

    this.fileName = file.name;

    const formData = new FormData();

    formData.append("avatar", file);

    const upload$ = this.http.post<ResponseData>("/u/avatar", formData);

    upload$.subscribe(
      resp=>{
        if(resp && resp.data ){
          let imageElement = document.getElementById("avatar_image");
          if(imageElement){
            let image = (<HTMLImageElement>imageElement);
            image.src = "/b/avatar?avatar_id=" + resp.data;
            this.userInfo.avatar = resp.data;
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
fileName="";


  constructor(
    private httpClientUtils: HttpClientUtils,
    private http: HttpClient,
  ) {
   }
  userInfo?:any;
  ngOnInit(): void {

    this.httpClientUtils.getUserInfo().subscribe(
      responseData =>{
        this.userInfo = responseData.data;
      }
    );
    // this.userInfo  = this.httpClientUtils.getUserInfo();
    console.log(1);
    console.log(this.userInfo);
    console.log(2);
    if(!this.userInfo){
      this.userInfo = getUserInfo().data;
    }
    // const data = getUserInfo();
    // const data = reponse.data;
  }

  
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
// @ApiModelProperty(value = "昵称")
	// private String nickname;

	// @ApiModelProperty(value = "生日")
	// private Date birthday;

	// @ApiModelProperty(value = "出生地区（国家）")
	// private String birthplace;

	// @ApiModelProperty(value = "出生省")
	// private String birthprovince;

	// @ApiModelProperty(value = "出生城市")
	// private String birthcity;

	// @ApiModelProperty(value = "姓")
	// private String firstname;

	// @ApiModelProperty(value = "名")
	// private String lastname;

	// @ApiModelProperty(value = "性别")
	// private Integer sex;

	// @ApiModelProperty(value = "年龄")
	// private Integer age;

	// @ApiModelProperty(value = "头像")
	// private String avatar;

	// @ApiModelProperty(value = "姓名")
	// private String name;

	// @ApiModelProperty(value = "国家")
	// private String country;

	// @ApiModelProperty(value = "城市")
	// private String city;

	// @ApiModelProperty(value = "详细地址")
	// private String address;

	// @ApiModelProperty(value = "职业（行业）")
	// private String profession;

	// @ApiModelProperty(value = "绑定微信")
	// private Integer bindWeixin;

	// @ApiModelProperty(value = "绑定github")
	// private Integer bindGithub;

	// @ApiModelProperty(value = "绑定手机")
	// private Integer bindPhone;

	// @ApiModelProperty(value = "绑定邮箱")
	// private Integer bindEmail;

	// @ApiModelProperty(value = "绑定苹果ID")
	// private Integer bindIphone;

	// @ApiModelProperty(value = "实名认证")
	// private Integer nameAuthentication;

	// @ApiModelProperty(value = "信誉值")
	// private String credit;

	// @ApiModelProperty(value = "表现发挥评分")
	// private String performanceScore;