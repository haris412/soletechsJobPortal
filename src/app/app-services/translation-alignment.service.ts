import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Application } from "../models/applicatiom.model";
import { apiURLs } from "../app.settings";


@Injectable({
    providedIn: 'root',
})
export class TranslationAlignmentService {
  languageChange:EventEmitter<boolean> = new EventEmitter();
  isTranslate:boolean = false;

constructor() { }

}
