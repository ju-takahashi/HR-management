import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  members: Member[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.getMemberes();
  }

  getMemberes(): void {
    // トップ社員情報の4つ（2番目、3番目、4番目、5番目）を返却
    this.memberService.getMemberes()
      .subscribe(members => this.members = members.slice(1, 5));
  }
}