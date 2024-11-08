export type GpuStats = {
    temp: string,
    usage: string,
}

export const getGpuStats = () => {
    try {
        const rawStats = Utils.exec('nvidia-smi --query-gpu=utilization.gpu,temperature.gpu --format=csv,noheader,nounits');
        const statsSplit = rawStats.split(', ');
        return { usage: statsSplit[0], temp: statsSplit[1] } as GpuStats;
    } catch (error) {
        console.error('Error getting GPU stats:', error);
        return { temp: 'x', usage: 'x' };
    }
}
