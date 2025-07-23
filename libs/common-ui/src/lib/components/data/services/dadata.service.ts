import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { DADATA_TOKEN } from "./token";
import { map } from "rxjs";
import { DadataSuggestion } from "../interfaces/dadata.interface";

@Injectable({
  providedIn: "root"
})

export class DadataService {
  #apiUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
  #http = inject(HttpClient)

  getSuggestion(query: string) {
    return this.#http.post<{suggestions: DadataSuggestion[]}>(this.#apiUrl, {query}, {
      headers: {
        "Authorization": `Token ${DADATA_TOKEN}`
      }
    })
    .pipe(
        map(response => {
          return response.suggestions;
        })
      )
    // .pipe(
    //   map(response => {
    //     return Array.from(
    //       new Set(
    //         response.suggestions.map(
    //           (suggestion: DadataSuggestion) => {
    //             return suggestion.data.city
    //           }
    //         )
    //       )
    //     )
    //   })
    // )
  }
}
