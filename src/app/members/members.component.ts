import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MemberesComponent implements OnInit {
  members: Member[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.getMemberes();
  }

  getMemberes(): void {
    this.memberService.getMemberes()
      .subscribe(members => this.members = members);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.memberService.addMember({ name } as Member)
      .subscribe(member => {
        this.members.push(member);
      });
  }

  delete(member: Member): void {
    this.members = this.members.filter(h => h !== member);
    this.memberService.deleteMember(member.id).subscribe();
  }
}