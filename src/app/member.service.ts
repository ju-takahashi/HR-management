import { Injectable } from '@angular/core';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private membersUrl = 'api/members';  // Web APIのURL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** サーバーから社員情報を取得する */
  getMemberes(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl)
      .pipe(
        tap(members => this.log('サーバーから社員情報を取得しました。')),
        catchError(this.handleError<Member[]>('getMemberes', []))
      );
  }

  /** IDにより社員情報を取得する。見つからなかった場合は404を返却する。 */
  getMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap(_ => this.log(`社員ID：${id} の社員情報を取得しました。`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }

  /** POST: サーバーに新しい社員情報を登録する */
  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl, member, this.httpOptions).pipe(
      tap((newMember: Member) => this.log(`${newMember.name}さんを社員情報に追加しました。社員ID：${newMember.id}`)),
      catchError(this.handleError<Member>('addMember'))
    );
  }

  /** PUT: サーバー上で社員情報を更新 */
  updateMember(member: Member): Observable<any> {
    return this.http.put(this.membersUrl, member, this.httpOptions).pipe(
      tap(_ => this.log(`${member.name}さんの社員情報を更新しました。社員ID：${member.id}`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  /** DELETE: サーバーから社員情報を削除 */
  deleteMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;

    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap(_ => this.log(`社員情報を削除しました。社員ID：${id}`)),
      catchError(this.handleError<Member>('deleteMember'))
    );
  }

  /* 検索語を含む社員情報を取得する */
  searchMemberes(term: string): Observable<Member[]> {
    if (!term.trim()) {
      // 検索語がない場合、空の社員情報配列を返す
      return of([]);
    }
    return this.http.get<Member[]>(`${this.membersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`"${term}"に一致する社員情報が見つかりました。`)),
      catchError(this.handleError<Member[]>('searchMemberes', []))
    );
  }

  /** MemberServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
}
