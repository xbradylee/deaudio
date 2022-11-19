import {expect} from "chai";
import {eventListener, sendEvent} from "./centralMsgBus";
import {ArtistButtonClickedMsg} from "./msg";


describe('artist store', () => {

    it('should listen to event when artist-button is clicked', (done) => {
        eventListener<ArtistButtonClickedMsg>('artist-button-clicked')
            .subscribe(msg => {
                expect(msg.artistAddress).to.equal('some address');
                done();
            });

        sendEvent<ArtistButtonClickedMsg>('artist-button-clicked',  { artistAddress: 'some address'});
    });

});