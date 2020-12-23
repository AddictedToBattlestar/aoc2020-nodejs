import logger from '@exmpl/utils/logger'

export default class Day1ExpenseReportRepair {
    public findTheTwoEntriesThatSumTo2020(
        expenseReportEntries: Array<number>
    ): number | undefined {
        for (let x = 0; x < expenseReportEntries.length - 1; x++) {
            for (let y = x + 1; y < expenseReportEntries.length; y++) {
                if (expenseReportEntries[x] + expenseReportEntries[y] === 2020) {
                    const multipliedResult = expenseReportEntries[x] * expenseReportEntries[y];
                    logger.info(`-Day 1- ${expenseReportEntries[x]} + ${expenseReportEntries[y]} = 2020, multiplied result = ${multipliedResult}\n`);
                    return multipliedResult;
                }
            }
        }
        return undefined;
    }

    public findTheThreeEntriesThatSumTo2020(
        expenseReportEntries: Array<number>
    ): number | undefined {
        for (let x = 0; x < expenseReportEntries.length - 2; x++) {
            for (let y = x + 1; y < expenseReportEntries.length - 1; y++) {
                for (let z = y + 1; z < expenseReportEntries.length; z++) {
                    if (expenseReportEntries[x] + expenseReportEntries[y] + expenseReportEntries[z] === 2020) {
                        const multipliedResult = expenseReportEntries[x] * expenseReportEntries[y] * expenseReportEntries[z];
                        logger.info(`-Day 1- ${expenseReportEntries[x]} + ${expenseReportEntries[y]} + ${expenseReportEntries[z]} = 2020, multiplied result = ${multipliedResult}.\n`);
                        return multipliedResult;
                    }
                }
            }
        }
        return undefined;
    }
}