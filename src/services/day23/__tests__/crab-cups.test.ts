import logger from '@exmpl/utils/logger';
import Day23CrabCups from '../crab-cups';

describe('Unit | Service | day23-crab-cups', () => {
    let subject: Day23CrabCups;

    beforeEach(() => {
        subject = new Day23CrabCups();
    });

    it('it solves the example provided from aoc for day 23 using 10 moves', async () => {
        const result = subject.play('389125467', 10);
        expect(result).toEqual('92658374');
    });

    it('it solves the example provided from aoc for day 23 using 100 moves', async () => {
        const result = subject.play('389125467', 100);
        expect(result).toEqual('67384529');
    });

    it('it solves part 1 for day 23', async () => {
        const result = subject.play('562893147', 100);
        expect(result).toBeDefined();
        logger.info(`-Day 23- The answer to part 1 is: ${result}\n`);
    });
})