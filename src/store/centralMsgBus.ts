import {filter, map, Observable, Subject} from "rxjs";


export type Msg<EVENT, DATA = undefined> = {
    event: EVENT
    data: DATA
}

const centralMsgBus = new Subject<Msg<unknown, unknown>>();

export const eventListener = <T extends Msg<T['event'], T['data']>>(event: T['event']) =>
    (centralMsgBus.asObservable() as Observable<T>).pipe(
        filter(msg => msg.event === event),
        map(msg => msg.data as T['data'])
    );

export const sendEvent =  <T extends Msg<T['event'], T['data']>>(event: T['event'], data?: T['data']) =>
    setTimeout(() => centralMsgBus.next({event, data}));