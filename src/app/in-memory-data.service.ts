import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from './member';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const members = [
      { id: 11, name: 'テスト太郎' },
      { id: 12, name: 'テスト花子' },
      { id: 13, name: '山田太郎' },
      { id: 14, name: '北海道道三郎' },
      { id: 15, name: '岩手いわ' },
      { id: 16, name: '沖縄縄子' },
      { id: 17, name: '新潟潟子' },
      { id: 18, name: '千葉葉子' },
      { id: 19, name: '金沢沢子' },
      { id: 20, name: '山梨梨子' }
    ];
    return {members};
  }

  // Overrides the genId method to ensure that a member always has an id.
  // If the members array is empty,
  // the method below returns the initial number (11).
  // if the members array is not empty, the method below returns the highest
  // member id + 1.
  genId(members: Member[]): number {
    return members.length > 0 ? Math.max(...members.map(member => member.id)) + 1 : 11;
  }
}