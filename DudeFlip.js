const predef = require("./tools/predef");
const meta = require("./tools/meta");

class DeltaFlip {
    map(d, i, history) {
        let bearishFlip;
        let bullishFlip;
        const tickSize = this.contractInfo.tickSize;
        if(i > 0) { 
            const deltaValue = d.offerVolume () - d.bidVolume ();
            const currentHigh = d.high();
            const currentLow = d.low();
            const prevDeltaValue = history.prior().offerVolume() - history.prior().bidVolume;
            const prevHigh = history.prior().high();
            const prevLow = history.prior().low();
            if (currentHigh >= prevHigh && prevDeltaValue <= -1000 && deltaValue > 0){
                bullishFlip = d.high() + (tickSize * this.props.plotInTick);
                
            }
            if (currentLow <= prevLow && deltaValue >= 1000 && deltaValue < 0){
                bearishFlip = d.low() - (tickSize * this.props.plotInTick);
            }
        }
        return{
            bearishFlip,
            bullishFlip
        };
    }
           

