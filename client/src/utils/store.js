import { dataStates } from '@/config/data-state';

/**
 * Обертка для экшенов со стейтом запроса к серверу
 *
 * @param {string} dataStateMutation
 * @param {Object} errorMutation
 * @returns {Function}
 */
export const withDataState = (dataStateMutation, errorMutation = null) => action => async (
    context,
    payload,
) => {
    context.commit(dataStateMutation, dataStates.loading);

    try {
        const result = await action(context, payload);
        context.commit(dataStateMutation, dataStates.loaded);

        return result;
    } catch (error) {
        context.commit(dataStateMutation, dataStates.failed);

        if (errorMutation) {
            context.commit(errorMutation, error);
        }

        throw error;
    }
};
