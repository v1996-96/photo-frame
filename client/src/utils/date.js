export const getWelcomeMsg = (currentTime = new Date()) => {
    const currentHour = currentTime.getHours();
    const splitAfternoon = 12;
    const splitEvening = 17;

    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
        return 'Добрый день!';
    } else if (currentHour >= splitEvening) {
        return 'Добрый вечер!';
    }

    return 'Доброе утро!';
};
