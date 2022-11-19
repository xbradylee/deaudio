import {eventListener, Msg, sendEvent} from "./centralMsgBus";
import {tap} from "rxjs";


describe("central msg bus", () => {

    it('should listen to event sent', () => {
        type NumberEvent = Msg<'number-event', number>

        eventListener<NumberEvent>('number-event').pipe(
            tap(data => expect(data).toEqual(20))
        ).subscribe();

        sendEvent<NumberEvent>('number-event', 20)
    });

});