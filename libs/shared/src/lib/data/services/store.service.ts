import { Injectable, signal } from "@angular/core";
import { Profile } from "@tt/interfaces/profile"

@Injectable({
  providedIn: "root"
})

export class StoreService {
  myProfile = signal<Profile | null>(null);
}
