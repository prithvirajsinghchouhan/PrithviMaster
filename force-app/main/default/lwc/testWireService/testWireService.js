import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class TestWireService extends LightningElement {
    @api recordId;

    @wire(getRecord,{recordId:'$recordId',layoutTypes: ['Full'],modes : ['View']})
    fetchedrecord;
}