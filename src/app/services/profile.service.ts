import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '@/model/profile';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  baseApiUrl = "https://icherniakov.ru/yt-course"

  constructor(private http: HttpClient) {}

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`)
  }
}
