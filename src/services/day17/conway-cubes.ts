import Day17ConwayCubeTracker from './conway-cube-tracker';
import logger from '@exmpl/utils/logger'

export default class Day17ConwayCubes {
  public sixCycleBoot(dimensionalData: Array<string>): number {
    const conwayCubeTracker = new Day17ConwayCubeTracker(dimensionalData);
    for(let cycle = 1; cycle < 7; cycle++) {
      logger.debug(`Running cycle ${cycle}`);
      conwayCubeTracker.cycle();
    }
    return conwayCubeTracker.getCountOfActiveCubes();
  }
}
