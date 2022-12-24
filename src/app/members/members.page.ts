import { Component, OnInit } from '@angular/core';
import { DataListService, Members } from '../data-list.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  constructor(public DataSrv : DataListService) { 
    this.changeSearch();
  }

  memberType="All Members";
  ngOnInit() {
  }
  searchList
  async changeSearch(){
    if(this.memberType=="Weekly"){
      this.searchList=this.DataSrv.MemberList.filter((obj) =>{
        return obj.type=="Weekly"
      })
    }
    else if(this.memberType=="Monthly"){
      this.searchList=this.DataSrv.MemberList.filter((obj) =>{
        return obj.type=="Monthly"
      })
    }
    else if(this.memberType=="Free Time"){
      this.searchList=this.DataSrv.MemberList.filter((obj) =>{
        return obj.type=="Free Time"
      })
    }
    else if(this.memberType=="All Members"){
      this.searchList=this.DataSrv.MemberList;
    }
    
  }

  remove(member){
    let index =this.DataSrv.MemberList.indexOf(member)
    if (index >-1){
      this.DataSrv.MemberList.splice(index,1)
    }

  }
}
