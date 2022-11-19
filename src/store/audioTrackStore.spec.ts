import {expect} from "chai";
import {eventListener, sendEvent} from "./centralMsgBus";
import {BuyAudioTrackMsg} from "./msg";


describe('audio track store', () => {

    it('should listen to event when artist-button is clicked', (done) => {
        eventListener<BuyAudioTrackMsg>('buy-audio-track')
            .subscribe(msg => {
                expect(msg.tokenId).to.equal(0);
                done();
            });

        sendEvent<BuyAudioTrackMsg>('buy-audio-track',  { tokenId: 0 });
    });

});