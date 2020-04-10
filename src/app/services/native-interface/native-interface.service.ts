import { Injectable } from '@angular/core';

const VERSION: string = '2.0.2';

@Injectable()
export class NativeInterfaceService {

  constructor() { }

  version():string {
    return VERSION;
  }  

  private static _window(): any {
    return window;
  }

  static hasSupport() {
    try {
      if (this._window().JSInterface) {
        return true;
      } else {
        return false;
      }
    } catch (ignore) {
      return false;
    }
  }

  static getPreferenceNumber(key: string, defaultValue: number) {
    var result = null;
      try {
        result = this._window().localStorage.getItem(key);
      } catch (ignore) {
      }

      if (result == null || result == "" || result == "null") {
        result = defaultValue;
      } else {
        try {
          result = Number(result);
        } catch (ignore) {
          result = defaultValue;
        }
      }
    return result;
  }  

  static getPreferenceBoolean(key: string, defaultValue: boolean) {
    var result = null;
      try {
        result = this._window().localStorage.getItem(key);
      } catch (ignore) {
      }

      if (result == null || result == "" || result == "null") {
        result = defaultValue;
      } else {
        try {
          result = ((result == "true") ||  (result == true));
        } catch (ignore) {
          result = defaultValue;
        }
      }
    return result;
  }    

  static getPreference(key: string, defaultValue: string) {
    var result = defaultValue;
      try {
        result = this._window().localStorage.getItem(key);
      } catch (ignore) {
      }

      if (result == null || result == "" || result == "null") {
        result = defaultValue;
      }
    return result;
  }

  static setPreference(key: string, value: any) {
      try {
        return this._window().localStorage.setItem(key, value);
      } catch (ignore) {
      }
  }

  static setPreferenceNumber(key: string, value: number) {
    try {
      return this._window().localStorage.setItem(key, value);
    } catch (ignore) {
    }
}  

}
