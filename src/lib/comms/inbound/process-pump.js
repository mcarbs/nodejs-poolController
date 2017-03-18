/*  nodejs-poolController.  An application to control pool equipment.
 *  Copyright (C) 2016, 2017.  Russell Goldin, tagyoureit.  russ.goldin@gmail.com
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

module.exports = function(container) {
    /*istanbul ignore next */
    if (container.logModuleLoading)
        container.logger.info('Loading: process-pump.js')

    var decoded

    function processPumpPacket(data, counter, packetType) {
        {

            if (container.settings.logPumpMessages)
                container.logger.silly('Msg# %s  Decoding pump packet %s', counter, data)

            switch (data[container.constants.packetFields.ACTION]) {
                case 1: //Set speed setting
                    {
                        container.pump_1.process(data, counter)
                        decoded = true;
                        break;
                    }
                case 2: //??
                    {
                        container.pump_2.process(data, counter)
                        decoded = true;
                        break;
                    }
                case 4: //Pump control panel on/off
                    {
                        container.pump_4.process(data, counter)
                        decoded = true;
                        break;
                    }
                case 5: //Set pump mode
                    {
                        container.pump_5.process(data, counter)
                        decoded = true;
                        break;
                    }
                case 6: //Turn pump on/off
                    {
                        container.pump_6.process(data, counter)
                        decoded = true;
                        break;
                    }
                case 7: //cyclical status of pump requesting pump status
                    {
                        container.common_7.process(data, counter)
                        decoded = true;
                        break;
                    }
                case 255: //03:17:39.122 INFO Msg# 5 is UNKNOWN: [16,96,255,1,8,2,29]  Possibly priming?
                    {
                        container.logger.warn('Msg# %s  Pump %s reject the command. %s', data[0], JSON.stringify(data))
                        decoded = false;
                        break;
                    }
                default:
                    {
                        if (container.settings.logPumpMessages)
                            container.logger.info('Msg# %s is UNKNOWN: %s', counter, JSON.stringify(data));
                        decoded = false;
                    }
            }


        }
        return decoded
    }



    /*istanbul ignore next */
    if (container.logModuleLoading)
        container.logger.info('Loaded: process-pump.js')

    return {
        processPumpPacket: processPumpPacket
    }
}


//End Pump Decode
