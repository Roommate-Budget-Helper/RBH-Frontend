import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../storage-service.service';
import ApiClient from '../api-client';
const STORAGE_KEY = 'local_userInfo';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';

import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FoodNode {
    name: string;
    children?: FoodNode[];
}
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'app-user-history-page',
    templateUrl: './user-history-page.component.html',
    styleUrls: ['./user-history-page.component.scss']
})
export class UserHistoryPageComponent implements OnInit {
    user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
    history: IHistoryResponse[];
    loaded = false;
    data = true;
    constructor(private router: Router, private StorageService: StorageServiceService) {
        // console.info('?????');
        // this.dataSource.data = TREE_DATA
    }
    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level
        };
    };
    treeControl = new FlatTreeControl<ExampleFlatNode>(
        (node) => node.level,
        (node) => node.expandable
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        (node) => node.level,
        (node) => node.expandable,
        (node) => node.children
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    async ngOnInit() {
        await ApiClient.history.getHistory(this.user.id).then((result: IHistoryResponse[]) => {
            this.history = result;
            this.loaded = !this.loaded;
        });

        let summary_data: FoodNode[] = [];
        this.history.forEach((element) => {
            let balanceWord = '';
            if (element.balance > 0) {
                balanceWord = element.userName + ' owes you $';
            } else {
                balanceWord = 'you owes ' + element.userName + ' $';
            }
            summary_data.push({
                name: element.userName,
                children: [
                    { name: 'Balance: ' + balanceWord + Math.abs(element.balance) + ' dollars.' },
                    { name: 'Number Of Bills Between You: ' + element.billCount }
                ]
            });
        });
        if (summary_data.length == 0) {
            this.data = false;
        }
        this.dataSource.data = summary_data;
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    handleBack = () => {
        this.router.navigateByUrl('/home');
    };

    handleLogout = () => {
        localStorage.clear();
        this.router.navigateByUrl('/');
        alert('Log out succeeded!');
    };
}
