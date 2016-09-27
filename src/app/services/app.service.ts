import { Injectable } from '@angular/core';
import { Response, Http,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";

import { App } from './../shared/models/app.model';


@Injectable()
export class AppService extends BaseService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http:Http) {
        super(http);
    }

    getApps() {
        const url = `${this.rootAddress + '/apps'}`;
        return this.http.get(url)
            .map((response:Response) => {
                return response.json().map(
                    app => this.parseApps(app)
                );
            })
    }

    getApp(id) {

        const url = `${this.rootAddress + '/appprofile'}/${id}`;
        return this.http.get(url)
            .map((response:Response) => {
                return response.json()
            })
    }

    addApp(app){
        const url = `${this.rootAddress + 'addapp'}`;
        return this.http.post(url,JSON.stringify(app), {headers: this.headers})
            .map((response: Response) => {
                return response.json()
            })
    }

    update(app:App) {
        const url = `${this.rootAddress + '/updateapp'}/${app.id}`;

        return this.http.put(url, JSON.stringify(app), {headers: this.headers})
            .map((response:Response) => {
                return response.json();
            })
    }

    parseApps(apiApp):App {
        return {
            id: apiApp.appdetail.id,
            appName: apiApp.appdetail.name,
            tags: apiApp.appdetail.hashtags,
            logoName: apiApp.appdetail.logoname,
            isApproved: apiApp.appdetail.isapproved === 'true'
        }
    }

}