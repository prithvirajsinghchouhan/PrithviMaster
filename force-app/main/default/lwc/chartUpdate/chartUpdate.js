import { LightningElement,track,wire } from 'lwc';
import {  fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners} from 'c/pubsub';

export default class ChartUpdate extends LightningElement {

    @track myMessage = 'ABC';
     @wire(CurrentPageReference) pageRef;

    sendMessage() {
        fireEvent(this.pageRef, 'messageFromSpace', this.myMessage);
   }
}