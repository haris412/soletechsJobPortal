import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class TranslationAlignmentService {
  languageChange:EventEmitter<boolean> = new EventEmitter();
  isTranslate:boolean = false;

constructor() { }

}
