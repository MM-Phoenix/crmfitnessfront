import store from "@/store/auth";

class ScheduleService {

    isTrainerScheduleEvent(trainerId) {
        return store.state.auth.user.id === trainerId;
    }

    isUserScheduledEvent(scheduleId) {
        if (store.state.auth.user.scheduleRegistrations) {
            for (let idx in store.state.auth.user.scheduleRegistrations) {
                if (store.state.auth.user.scheduleRegistrations[idx].scheduleId === Number(scheduleId)) {
                    return true;
                }
            }
        }
        return false;
    }
}

export default new ScheduleService();