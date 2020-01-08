import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = "local_userInfo"
const HOME_STORAGE_KEY = "local_homeId"


// export const MY_AWESOME_SERVICE_STORAGE =
//     new InjectionToken<StorageService>('MY_AWESOME_SERVICE_STORAGE');

// @Injectable()
export class StorageServiceService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
  storeOnLocalStorage = (userinfo: ILoginResponse): void  => {
       
       // get array of tasks from local storage
       const userInfo = userinfo ;
       // push new task to array
       // insert updated array to local storage
       this.storage.set(STORAGE_KEY, userInfo);
       console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  getLocalStorage = (key: String) => {
    return this.storage.get(STORAGE_KEY)|| 'LocaL storage is empty';
  }

  storeHomeOnLocalStorage = (homeId: Number): void  => {
       
    // get array of tasks from local storage
    const homeid = homeId;
    // push new task to array
    // insert updated array to local storage
    this.storage.set(HOME_STORAGE_KEY, homeid);
}

  getHomeLocalStorage = (key: String) => {
  return this.storage.get(HOME_STORAGE_KEY)|| 'LocaL storage is empty';
  }
}
