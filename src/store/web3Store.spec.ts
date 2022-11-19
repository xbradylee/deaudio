import {expect} from 'chai';
import {ExternalProvider} from "@ethersproject/providers";
import {newWeb3Provider} from "../services/web3Service";
import {sendEvent} from "./centralMsgBus";
import {ProviderMsg} from "./msg";
import {provider$} from "./web3Store";

describe('web 3 provider store', () => {

    it('should get web 3 provider', (done) => {
        provider$.subscribe(provider => {
            expect(provider.web3Provider._isProvider).to.be.true;
            expect(provider.isConnected).to.be.true;
            done();
        });

        sendEvent<ProviderMsg>('provider', {
            web3Provider: provider,
            signer: provider.getSigner(),
            isConnected: true,
        })
    });

});

const externalProvider = ({
    request: (_: { method: string; params?: any[]; }) => {}
} as ExternalProvider);

const provider = newWeb3Provider(externalProvider);