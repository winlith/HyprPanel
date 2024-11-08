import options from 'options';

// Module initializer
import { module } from '../module';

import Button from 'types/widgets/button';

// Utility Methods
import { inputHandler } from 'customModules/utils';
import { BarBoxChild } from 'lib/types/bar';
import { Attribute, Child } from 'lib/types/widget';
import { getGpuStats, GpuStats } from './gpu';
import { pollVariable } from 'customModules/PollVar';

// All the user configurable options for the cpu module that are needed
const {
    label,
    showUnit,
    leftClick,
    rightClick,
    middleClick,
    scrollUp,
    scrollDown,
    pollingInterval,
    icon,
} = options.bar.customModules.gpu;

export const gpuStats = Variable<GpuStats>({ temp: '', usage: '' });

pollVariable(gpuStats, [showUnit.bind('value')], pollingInterval.bind('value'), getGpuStats);

export const GpuCombo = (): BarBoxChild => {
    const renderLabel = (stats: GpuStats, shwUnit: boolean): string => {
        const unit = shwUnit ? ` C` : '';
        return `${stats.usage}% ${stats.temp}°${unit}`;
    };

    const gpuModule = module({
        textIcon: icon.bind('value'),
        label: Utils.merge([gpuStats.bind('value'), showUnit.bind('value')], (stats, shwUnit) => {
            return renderLabel(stats, shwUnit);
        }),
        tooltipText: 'GPU',
        boxClass: 'gpu',
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

    return gpuModule;
};
