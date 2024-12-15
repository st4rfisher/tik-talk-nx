import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Profile } from '@/model/profile';
import { Pageable } from '@/model/pageable';
import { map, tap } from 'rxjs';
import { BASE_API_URL } from '@/global/variables';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  myProfile = signal<Profile | null>(null)
  filteredProfiles = signal<Profile[]>([])

  constructor(private http: HttpClient) {}

  getSubscribersShortList(limit: number = 3) {
    return this.http.get<Pageable<Profile>>(`${BASE_API_URL}/account/subscribers/`)
      .pipe(
        map(response => response.items.slice(0, limit))
      )
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${BASE_API_URL}/account/test_accounts`)
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${BASE_API_URL}/account/${id}`)
  }

  getMyAccount() {
    return this.http.get<Profile>(`${BASE_API_URL}/account/me`)
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
    return this.http.patch<Profile>(`${BASE_API_URL}/account/me`, data)
  }

  uploadAvatar(file: File) {
    const formData = new FormData()

    formData.append('image', file)
    return this.http.post<Profile>(`${BASE_API_URL}/account/upload_image`, formData)
  }

  filterProfiles(params: Record<string, any>) {
    return this.http.get<Pageable<Profile>>(`${BASE_API_URL}/account/accounts`, { params })
      .pipe(
        tap(responce => this.filteredProfiles.set(responce.items))
      )
  }
}
