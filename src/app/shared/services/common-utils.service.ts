import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
    providedIn: 'root',
})
export class CommonUtilsService {
    constructor(){}

    DateFormatValidator = (control: AbstractControl) => {
            const date = control.value;
            if (date) {
              if (typeof date === 'string' && typeof date !== null) {
                if (/[0-9]{4}-(0?[1-9]|1[0-2])-(0?[1-9]|1\d|2\d|3[01])/.test(date)) {
                  return null;
                } else {
                  return { forbiddenName: { value: control.value } };
                }
              }
            }
            return null;
          };
         
          WebsiteUrlValidator = (control: AbstractControl): ValidationErrors | null => {
            const url = control.value;
            const regexp =
              /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/gmu;
            if (url) {
              if (regexp.test(url)) {
                return null;
              } else {
                return {
                  invalid: true,
                };
              }
            }
            return null;
          };
         
          AzureApiNameValidator = (
            control: AbstractControl
          ): ValidationErrors | null => {
            const name = control?.value;
            if (name) {
              if (/^[a-zA-Z](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(name)) {
                return null;
              } else {
                return {
                  invalid: true,
                };
              }
            }
            return null;
          };
         
          AlphaNumericValidator = (
            control: AbstractControl
          ): ValidationErrors | null => {
            const alphanumeric = control.value;
            if (alphanumeric) {
              if (
                /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/.test(
                  alphanumeric
                )
              ) {
                return null;
              } else {4;
                return {
                  invalid: true,
                };
              }
            }
            return null;
          };
         
          NoSpaceValidator = (control: AbstractControl): ValidationErrors | null => {
            const nospace = control.value;
            if (nospace) {
              if (/^\S*$/.test(nospace)) {
                return null;
              } else {
                return {
                  invalid: true,
                };
              }
            }
            return null;
          };
         
          NameValidator = (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (value) {
              if (
                /^([A-Za-z]([ ])*([.']?[A-Za-z0-9]+)*([-']?[A-Za-z0-9]+)*)+$/.test(
                  value
                )
              ) {
                return null;
              } else {
                return {
                  invalid: true,
                };
              }
            }
            return null;
          };
          AmountValidator = (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (value) {
              if (
                /^([A-Z]{3}|[A-Z]?[\$€¥])?\s?(\d{1,3}((,\d{1,3})+)?(.\d{1,3})?(.\d{1,3})?(,\d{1,3})?)([ ]?[MBT]{1})?$/.test(
                  value
                )
              ) {
                return null;
              } else {
                return {
                  invalid: true,
                };
              }
            }
            return null;
          };
          PhoneNumberValidator = (
            control: AbstractControl
          ): ValidationErrors | null => {
            const phone = control.value;
            if (phone)
         {
              if (/^\+?[1-9]\d{1,14}$/.test(phone)) {
                return null;
              } else {
                return {
                  invalid: true,
                };
              }
            }
            return null;
          };
          ProcessCodeValidator = (
            control: AbstractControl
          ): ValidationErrors | null => {
            const processCode = control?.value;
            if (processCode) {
              if (/^[a-zA-Z0-9](?:[a-zA-Z0-9_]*[a-zA-Z0-9])?$/.test(processCode)) {
                return null;
              } else {
                return {
                  invalid: true,
                };
              }
            }
            return null;
          };
          ExcludeSpaceValidator = (
            control: AbstractControl
          ): ValidationErrors | null => {
            const exceptSpace = control?.value;
            if (exceptSpace) {
              if (
                /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[A-Za-z0-9_@./#&+-]{2,}$/.test(
                  exceptSpace
                )
              ) {
                return null;
              } else {
                return {
                  invalid: true,
                };
              }
            }
            return null;
          };
         
          NoWhiteSpaceValidator = (control: AbstractControl): ValidationErrors | null => {
            const nospace = control.value;
            if(!nospace || nospace.trim() == ''){
              return {
                invalid: true,
              };
            }
            return null;
          };
         
          StoreInLocalStorage = (key: string, content: string) => {
            localStorage.setItem(key, content);
          };
         
          MapRowFromSummaryLookUpsDto(summaryLookUps: SummaryLookUps[]): any[] {
            let row: any[] = [];
            summaryLookUps.forEach((summaryLookUp) => {
              row.push([summaryLookUp.name, summaryLookUp.value]);
            });
            return row;
          }
          GetFromLocalStorage = (key: string): string => {
            return localStorage.getItem(key)
         ?? '';
          };
         
          RemoveFromLocalStorage = (key: string) => {
            localStorage.removeItem(key)
        ;
          };
         
          ErrorToast = (message = '', title = 'Error!', enableHTML = false) => {
            this.toastrService.error(message, title, { enableHtml: enableHTML });
          };
         
          InfoToast = (message = '', title = 'Info!', enableHTML = false) => {
            this.toastrService.info(message, title, { enableHtml: enableHTML });
          };
         
          WarningToast = (message = '', title = 'Warning!', enableHTML = false) => {
            this.toastrService.warning(message, title, { enableHtml: enableHTML });
          };
         
          SuccessToast = (message = '', title = 'Success!', enableHTML = false) => {
            this.toastrService.info(message, title, { enableHtml: enableHTML });
          };
         
          ConvertToBase64 = (event: any) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(event);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });
          GetFileContent = (event: any) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsText(event, 'UTF-8');
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });
         
          GetBlobFromUrl = async (url: string) => {
            const requestOptions: Object = {
              headers: new HttpHeaders(),
              responseType: 'text',
            };
            return await this.httpClient.get<string>(url, requestOptions).toPromise();
          };
         
          async DownloadFile(url: string, fileName: string) {
            const base64 = (await this.GetBlobFromUrl(url)) as string;
            let blob = new Blob([base64], {
              type: 'text/plain;charset=utf-8',
            });
            await saveAs(blob, fileName);
          }
         
          GetBase64ImageFromUrl = async (imageUrl: string) => {
            let res = await fetch(imageUrl);
            let blob = await res.blob();
            return new Promise((resolve, reject) => {
              let reader = new FileReader();
              reader.addEventListener(
                'load',
                function () {
                  resolve(reader.result);
                },
                false
              );
              reader.onerror = () => {
                return reject(this);
              };
              reader.readAsDataURL(blob);
            });
          };
          GetCompanyData() {
            let company = {
              id: 1,
              name: 'WERNER',
            };
            if (localStorage.getItem('company'))
              return JSON.parse(localStorage.getItem('company') ?? '');
            else return company;
          }
          GetFileBytes(event: Event) {
            const target: HTMLInputElement = event.target as HTMLInputElement;
            const reader = new FileReader();
            const fileByteArray: any[] = [];
            const files: File = (target.files as FileList)[0];
            reader.readAsArrayBuffer(files);
            reader.onload = function (evt) {
              if (evt?.target?.result) {
                const arrayBuffer: ArrayBuffer = evt?.target?.result as ArrayBuffer,
                  array = new Uint8Array(arrayBuffer);
                for (const a of array) {
                  fileByteArray.push(a);
                }
              }
            };
            return fileByteArray;
          }
          ToPascal(s: string) {
            return s[0].toUpperCase() + s.substring(1);
          }
         
          KeysToPascal(o: any): any {
            if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
              let n = new Object() as any;
              Object.keys(o).forEach((k) => {
                n[this.ToPascal(k)] = this.KeysToPascal(o[k]);
              });
              return n;
            } else if (Array.isArray(o)) {
              return o.map((i) => {
                return this.KeysToPascal(i);
              });
            }
            return o;
          }
         
          HandleError(error: any) {
            this.ErrorToast(error);
          }
         
          RemoveHtml(value: string) {
            let regex = /(<([^>]+)>|&nbsp;|&#160;|&#34;|&amp;|&#10;|&#8221;|&#8220;|span|str|br|li|>|<)/ig;
            let stripedHtml = value.replace(regex, '');
            return stripedHtml;
          }
        }
}