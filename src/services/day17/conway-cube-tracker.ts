const ACTIVE_CUBE_INDICATOR: string = '#';
const INACTIVE_CUBE_INDICATOR: string = '.';
const CUBE_GOING_ACTIVE_INDICATOR: string = '+';
const CUBE_GOING_INACTIVE_INDICATOR: string = '-';

export default class Day17ConwayCubeTracker {
    private dimensionalData: Array<Array<Array<string>>>;

    constructor(dimensionalDataProvided: Array<string>) {
        this.dimensionalData = this.buildInitialDimensionalData(dimensionalDataProvided);
    }

    private buildInitialDimensionalData(dimensionalDataProvided: Array<string>): Array<Array<Array<string>>> {
        let dimensionalPlane: Array<Array<string>> = [];
        dimensionalDataProvided.forEach(dimensionalSlice => {
            dimensionalPlane.push(dimensionalSlice.split(""));
        });
        return [dimensionalPlane];
    }

    public cycle() {
        this.expandDimensionalSpace();
        for (let z = 0; z < this.dimensionalData.length; z++) {
            for (let y = 0; y < this.dimensionalData[z].length; y++) {
                for (let x = 0; x < this.dimensionalData[z][y].length; x++) {
                    const nextStateForCube = this.determineNextStateForCubeLocation(z, y, x);
                    this.dimensionalData[z][y][x] = nextStateForCube;
                }
            }
        }
        this.moveDimensionalDataToNextCycle();
    }

    private expandDimensionalSpace() {
        for (let z = 0; z < this.dimensionalData.length; z++) {
            this.expandDimensionalPlane(z);
        }
        const newTopDimensionalPlane = this.buildNewDimensionalPlane();
        this.dimensionalData.unshift(newTopDimensionalPlane);
        const newBottomDimensionalPlane = this.buildNewDimensionalPlane();
        this.dimensionalData.push(newBottomDimensionalPlane);
    }

    private expandDimensionalPlane(z: number) {
        for (let y = 0; y < this.dimensionalData[z].length; y++) {
            let dimensionalSlice = this.dimensionalData[z][y];
            dimensionalSlice.unshift(INACTIVE_CUBE_INDICATOR);
            dimensionalSlice.push(INACTIVE_CUBE_INDICATOR);
        }
        const newTopSlice = new Array(this.dimensionalData[z][0].length).fill(INACTIVE_CUBE_INDICATOR);
        this.dimensionalData[z].unshift(newTopSlice);
        const newBottomSlice = new Array(this.dimensionalData[z][0].length).fill(INACTIVE_CUBE_INDICATOR);
        this.dimensionalData[z].push(newBottomSlice);
    }

    private buildNewDimensionalPlane() {
        let newDimensionalPlane: Array<Array<string>> = [];
        const planeHeight = this.dimensionalData[0].length;
        const planeWidth = this.dimensionalData[0][0].length;
        for (let y = 0; y < planeHeight; y++) {
            const newDimensionalSlice = new Array(planeWidth).fill(INACTIVE_CUBE_INDICATOR);
            newDimensionalPlane.push(newDimensionalSlice);
        }
        return newDimensionalPlane;
    }

    public getCountOfActiveCubes(): number {
        let totalCount = 0;
        this.dimensionalData.forEach(dimensionalPlane => {
            dimensionalPlane.forEach(dimensionalSlice => {
                totalCount += dimensionalSlice.filter(cube => cube === ACTIVE_CUBE_INDICATOR).length;
            });
        });
        return totalCount;
    }

    private determineNextStateForCubeLocation(z: number, y: number, x: number): string {
        const countOfNeighboringActiveCubes = this.getCountOfNeighboringActiveCubes(z, y, x);
        if (this.dimensionalData[z][y][x] === ACTIVE_CUBE_INDICATOR) {
            if(countOfNeighboringActiveCubes !== 2 && countOfNeighboringActiveCubes !== 3) {
                return CUBE_GOING_INACTIVE_INDICATOR;
            } else {
                return ACTIVE_CUBE_INDICATOR;
            }
        } else {
            if (countOfNeighboringActiveCubes === 3) {
                return CUBE_GOING_ACTIVE_INDICATOR;
            } else {
                return INACTIVE_CUBE_INDICATOR;
            }
        }
    }

    private getCountOfNeighboringActiveCubes(referenceZ: number, referenceY: number, referenceX: number): number {
        let totalCountOfActiveCubes = 0;
        for (let z = referenceZ - 1; z <= referenceZ + 1; z++) {
            for (let y = referenceY - 1; y <= referenceY + 1; y++) {
                for (let x = referenceX - 1; x <= referenceX + 1; x++) {
                    if (!(this.isOutOfBounds(z, y, x)) && !(z === referenceZ && y === referenceY && x === referenceX)) {
                        if (this.dimensionalData[z][y][x] === ACTIVE_CUBE_INDICATOR || this.dimensionalData[z][y][x] === CUBE_GOING_INACTIVE_INDICATOR) {
                            totalCountOfActiveCubes++;
                        }
                    }
                }
            }
        }
        return totalCountOfActiveCubes;
    }

    private isOutOfBounds(z: number, y: number, x: number): boolean {
        return !this.dimensionalData[z] || !this.dimensionalData[z][y] || !this.dimensionalData[z][y][x];
    }

    private moveDimensionalDataToNextCycle() {
        for (let z = 0; z < this.dimensionalData.length; z++) {
            for (let y = 0; y < this.dimensionalData[z].length; y++) {
                for (let x = 0; x < this.dimensionalData[z][y].length; x++) {
                    switch (this.dimensionalData[z][y][x]) {
                        case CUBE_GOING_ACTIVE_INDICATOR:
                            this.dimensionalData[z][y][x] = ACTIVE_CUBE_INDICATOR;
                            break;
                        case CUBE_GOING_INACTIVE_INDICATOR:
                            this.dimensionalData[z][y][x] = INACTIVE_CUBE_INDICATOR;
                            break;
                    }
                }
            }
        }
    }
}
