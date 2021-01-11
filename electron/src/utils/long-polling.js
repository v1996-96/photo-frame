/**
 * Long polling
 *
 * @example
 * const action = () => Promise.resolve();
 *
 * const poll = new LongPolling(action, 1000, {
 *    maxFailures: 5,
 *    ignoreFailures: false,
 *    onError: () => {},
 *    onSuccess: () => {},
 *    onAbort: () => {},
 * });
 *
 * @param {Function} action функция
 * @param {number} delay время между вызовами
 * @param {Object} options настройки
 */
export function LongPolling(action, delay, options = {}) {
    if (!action) {
        throw Error('[LongPolling] Wrong action received');
    }

    if (isNaN(delay)) {
        throw Error('[LongPolling] Wrong delay received');
    }

    // Private fields:
    let running = false;
    let instance = null;
    let executionId = null;
    let timeout = delay;
    let failuresCount = 0;
    const opt = {
        actionArguments: [],
        maxFailures: 0,
        ignoreFailures: false,
        executeImmediately: true,
        onError: () => {},
        onSuccess: () => {},
        onAbort: () => {},
        ...options,
    };

    // Private methods:
    const execute = async (id, processAction = true) => {
        const { maxFailures, ignoreFailures, actionArguments, onError, onSuccess, onAbort } = opt;
        running = true;

        if (processAction) {
            try {
                const result = await action(this, ...actionArguments);

                failuresCount = 0;
                onSuccess(result);
            } catch (error) {
                failuresCount++;
                onError(error);

                if (!ignoreFailures && failuresCount >= maxFailures) {
                    this.stop();
                    onAbort(error);
                    return;
                }
            }
        }

        if (id === executionId) {
            instance = setTimeout(execute, timeout, id);
        }
    };

    // Public methods:
    this.start = () => {
        if (running) {
            return;
        }

        executionId = Symbol('LongPolling');
        execute(executionId, opt.executeImmediately);
    };

    this.stop = () => {
        clearTimeout(instance);
        executionId = null;
        instance = null;
        running = false;
        failuresCount = 0;
    };

    this.setTimeout = (delay, restart = false) => {
        if (!isNaN(delay) && timeout !== delay) {
            timeout = delay;

            if (restart) {
                this.stop();
                this.start();
            }
        }
    };

    this.isRunning = () => running;
}
