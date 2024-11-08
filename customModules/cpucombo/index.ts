import options from 'options';

// Module initializer
import { module } from '../module';

import Button from 'types/widgets/button';

// Utility Methods
import { inputHandler } from 'customModules/utils';
import { BarBoxChild } from 'lib/types/bar';
import { Attribute, Child } from 'lib/types/widget';
import { UnitType } from 'lib/types/weather';
import { cpuUsage } from 'customModules/cpu/index';
import { cpuTemp } from 'customModules/cputemp/index';

// All the user configurable options for the cpu module that are needed
const { label, round, leftClick, rightClick, middleClick, scrollUp, scrollDown, pollingInterval, icon } =
    options.bar.customModules.cpu;
const { showUnit, unit } = options.bar.customModules.cpuTemp;

export const CpuCombo = (): BarBoxChild => {
    const renderLabel = (cpuUsg: number, cpuTemp: number, tempUnit: UnitType, shwUnit: boolean, rnd: boolean): string => {
        const unitLabel = tempUnit === 'imperial' ? 'F' : 'C';
        const unit = shwUnit ? ` ${unitLabel}` : '';
        return rnd ? `${Math.round(cpuUsg)}%  ${cpuTemp.toString()}°${unit}` : `${cpuUsg.toFixed(2)}%  ${cpuTemp.toString()}°${unit}`;
    };

    const cpuModule = module({
        textIcon: icon.bind('value'),
        label: Utils.merge([cpuUsage.bind('value'), cpuTemp.bind('value'), unit.bind('value'), showUnit.bind('value'), round.bind('value')], (cpuUsg, cpuTemp, tempUnit, shwUnit, rnd) => {
            return renderLabel(cpuUsg, cpuTemp, tempUnit, shwUnit, rnd);
        }),
        tooltipText: 'CPU',
        boxClass: 'cpu',
        showLabelBinding: label.bind('value'),
        props: {
            setup: (self: Button<Child, Attribute>) => {
                inputHandler(self, {
                    onPrimaryClick: {
                        cmd: leftClick,
                    },
                    onSecondaryClick: {
                        cmd: rightClick,
                    },
                    onMiddleClick: {
                        cmd: middleClick,
                    },
                    onScrollUp: {
                        cmd: scrollUp,
                    },
                    onScrollDown: {
                        cmd: scrollDown,
                    },
                });
            },
        },
    });

    return cpuModule;
};
