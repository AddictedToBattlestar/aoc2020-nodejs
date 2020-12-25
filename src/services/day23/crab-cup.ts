export default class CrabCup {
    public next: CrabCup | undefined;
    public previous: CrabCup | undefined;
    public label: string

    constructor(labelToApply: string) {
        this.label = labelToApply;
    }

    public getLabelValue(): number {
        return Number(this.label);
    }
}