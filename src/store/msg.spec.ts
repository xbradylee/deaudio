import {eventListener, Msg, sendEvent} from "./centralMsgBus";
import {map} from "rxjs";

describe('msg', () => {

    it('should have no type errors', () => {
        type MsgFoo = Msg<'foo'>

        eventListener<MsgFoo>('foo').pipe(
            map(data => data)
        );

        sendEvent<MsgFoo>('foo');
    });

    it('should have no type errors with data', () => {
        type MsgBar = Msg<'bar', {bar: number}>

        eventListener<MsgBar>('bar').pipe(
            map(data => data.bar)
        );

        sendEvent<MsgBar>('bar', {bar: 20});
    });

});