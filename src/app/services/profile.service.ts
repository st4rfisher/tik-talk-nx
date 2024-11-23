import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Profile } from '@/model/profile';
import { Pageable } from '@/model/pageable';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  baseApiUrl = "https://icherniakov.ru/yt-course"
  myProfile = signal<Profile | null>(null)

  constructor(private http: HttpClient) {}

  getSubscribersShortList(limit: number = 3) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}/account/subscribers/`)
      .pipe(
        map(response => response.items.slice(0, limit))
      )
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`)
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/${id}`)
  }

  getMyAccount() {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/me`)
      .pipe(
        tap(
          response => {
            this.myProfile.set(response)
            console.log(this.myProfile())
          }
        )
      )
  }

  patchProfileData(data: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}/account/me`, data)
  }

  uploadAvatar(file: File) {
    const formData = new FormData()

    formData.append('image', file)
    return this.http.post<Profile>(`${this.baseApiUrl}/account/upload_image`, formData)
  }
}
