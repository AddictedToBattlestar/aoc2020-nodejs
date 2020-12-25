import logger from '@exmpl/utils/logger';
import CrabCup from './crab-cup';

const MAX_ITERATIONS_ALLOWED = 20;

export default class Day23CrabCups {
    public play(cupLabelOrder: string, numberOfTurnsToPlay: number): string {
        let currentCrabCup: CrabCup | undefined = this.buildCircleOfCups(cupLabelOrder);
        logger.debug(`-- move 1 --`);
        logger.debug(`cups: ${this.getPrintabeCupCircle(currentCrabCup, true)}`);
        for (let i = 0; i < numberOfTurnsToPlay; i++) {
            currentCrabCup = this.move(currentCrabCup);
            logger.debug(`-- move ${i + 2} --`);
            logger.debug(`cups: ${this.getPrintabeCupCircle(currentCrabCup, true)}`);
        }
        const cupListing = this.getCurrentCupListingAfterLabel1(currentCrabCup);
        return cupListing;
    }

    private buildCircleOfCups(cupLabelOrder: string): CrabCup {
        let currentCrabCup: CrabCup | undefined = new CrabCup(cupLabelOrder.substring(0, 1));
        let previousCrabCup: CrabCup | undefined;
        cupLabelOrder.substring(1).split('').forEach(cupLabel => {
            let newCrabCup = new CrabCup(cupLabel);
            if (!currentCrabCup) {
                currentCrabCup = newCrabCup;
            } else {
                if (!previousCrabCup) {
                    newCrabCup.previous = currentCrabCup;
                    currentCrabCup.next = newCrabCup;
                } else {
                    newCrabCup.previous = previousCrabCup;
                    previousCrabCup.next = newCrabCup;
                }
                previousCrabCup = newCrabCup;
            }
        })
        if (previousCrabCup) {
            previousCrabCup.next = currentCrabCup;
        }
        currentCrabCup.previous = previousCrabCup;
        return currentCrabCup;
    }

    private getPrintabeCupCircle(currentCrabCup: CrabCup, emphasizeCurrentCupInOutput: boolean): string {
        let output = emphasizeCurrentCupInOutput ? `(${currentCrabCup.label})` : `${currentCrabCup.label}`;
        const startingLabel = currentCrabCup.label;
        let loopCount = 0;
        while (currentCrabCup.next && currentCrabCup.next.label !== startingLabel) {
            if (loopCount > MAX_ITERATIONS_ALLOWED) {
                throw "Looping error: Max iterations reached (getPrintabeCupCircle)";
            }
            currentCrabCup = currentCrabCup.next;
            output += ` ${currentCrabCup.label}`;
            loopCount++;
        }
        return output;
    }

    private move(currentCrabCup: CrabCup): CrabCup {
        const threeCupString = this.pickUpThreeCups(currentCrabCup);
        logger.debug(`pick up: ${this.getPrintabeCupCircle(threeCupString, false)}`);
        const destinationCup = this.findDestinationCup(currentCrabCup, currentCrabCup.getLabelValue() - 1);
        logger.debug(`destination: ${destinationCup.label}`)
        this.placeThreeCupsAfterDestinationCup(destinationCup, threeCupString);
        return currentCrabCup.next;
    }

    private getCurrentCupListingAfterLabel1(currentCrabCup: CrabCup): string {
        currentCrabCup = this.findCrabCupOne(currentCrabCup);
        let output = ``;
        let loopCount = 0;
        while (currentCrabCup.next && currentCrabCup.next.label !== '1') {
            if (loopCount > MAX_ITERATIONS_ALLOWED) {
                throw "Looping error: Max iterations reached (getCurrentCupListingAfterLabel1)";
            }
            currentCrabCup = currentCrabCup.next;
            output += `${currentCrabCup.label}`;
            loopCount++;
        }
        return output;
    }

    private findCrabCupOne(currentCrabCup: CrabCup): CrabCup {
        let loopCount = 0;
        while(currentCrabCup.label !== '1') {
            if (loopCount > MAX_ITERATIONS_ALLOWED) {
                throw "Looping error: Max iterations reached (findCrabCupOne)";
            }
            currentCrabCup = currentCrabCup.next;
            loopCount++;
        }
        return currentCrabCup;
    }

    private pickUpThreeCups(currentCrabCup: CrabCup): CrabCup {
        let leadingCup = currentCrabCup.next;
        let trailingCup = leadingCup;
        for (let i = 0; i < 2; i++) {
            trailingCup = trailingCup?.next;
        }
        let nextCup = trailingCup.next;
        trailingCup.next = undefined;
        currentCrabCup.next = nextCup;
        nextCup.previous = currentCrabCup;
        return leadingCup;
    }

    private findDestinationCup(currentCrabCup: CrabCup, desiredCupLabelValue: number): CrabCup {
        const originalCurrentCrabCup = currentCrabCup;
        let lowestCupLabel = currentCrabCup.getLabelValue();
        let loopCount = 0;
        while (currentCrabCup.next && currentCrabCup.next.label !== originalCurrentCrabCup.label) {
            if (loopCount > MAX_ITERATIONS_ALLOWED) {
                throw "Looping error: Max iterations reached (findDestinationCup)";
            }
            currentCrabCup = currentCrabCup.next;
            if(currentCrabCup.getLabelValue() === desiredCupLabelValue) {
                return currentCrabCup;
            }
            if(currentCrabCup.getLabelValue() < lowestCupLabel) {
                lowestCupLabel = currentCrabCup.getLabelValue();
            }
            loopCount++;
        }
        if (desiredCupLabelValue < lowestCupLabel) {
            return this.getHighestCrabCubAvailable(originalCurrentCrabCup);
        }
        return this.findDestinationCup(originalCurrentCrabCup, desiredCupLabelValue - 1);
    }

    private getHighestCrabCubAvailable(currentCrabCup: CrabCup): CrabCup {
        const originalCurrentCrabCup = currentCrabCup;
        let highestCrabCup: CrabCup = currentCrabCup.next;
        let loopCount = 0;
        while (currentCrabCup.next && currentCrabCup.next.label !== originalCurrentCrabCup.label) {
            if (loopCount > MAX_ITERATIONS_ALLOWED) {
                throw "Looping error: Max iterations reached (getHighestCrabCubAvailable)";
            }
            currentCrabCup = currentCrabCup.next;
            if(!highestCrabCup || highestCrabCup.getLabelValue() < currentCrabCup.getLabelValue()) {
                highestCrabCup = currentCrabCup;
            }
            loopCount++;
        }
        return highestCrabCup;
    }

    private placeThreeCupsAfterDestinationCup(destinationCup: CrabCup, threeCupString: CrabCup) {
        const joiningCup = destinationCup.next;
        destinationCup.next = threeCupString;
        threeCupString.previous = destinationCup;

        const lastCupInString = threeCupString.next?.next;
        lastCupInString.next = joiningCup;
        joiningCup.previous = lastCupInString;
    }
}
