import Day17ConwayCubes from '../conway-cubes'
import logger from '@exmpl/utils/logger'

describe('Unit | Service | day17-conway-cubes', () => {
    let subject: Day17ConwayCubes;

    beforeEach(() => {
        subject = new Day17ConwayCubes();
    });

    it('it solves the example provided from aoc for day 17', async () => {
        const result = subject.sixCycleBoot(exampleData);
        expect(result).toEqual(112);
    })

    it('it solves for part 1 for day 17', async () => {
        const result = subject.sixCycleBoot(sourceData);
        expect(result).toBeDefined();
        logger.info(`-Day 12- The answer to part 1 is: ${result}\n`);
    })

    const exampleData: Array<string> = (`
    .#.
    ..#
    ###
    `).trim().split("\n").map(l => l.trim());

    const sourceData: Array<string> = (`
    ####...#
    ......##
    ####..##
    ##......
    ..##.##.
    #.##...#
    ....##.#
    .##.#.#.
    `).trim().split("\n").map(l => l.trim());
})