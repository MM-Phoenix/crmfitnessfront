import axios from 'axios';
import authHeader from '../store/authHeader';
import Constants from "@/api/Constants";

class UserAPI {

    getUser() {
        return axios.get(Constants.USER_URL, { headers: authHeader() });
    }

    updateUser(user) {
        return axios.put(Constants.USER_URL, user, { headers: authHeader() });
    }

    getScheduleFirstWorkedMillis() {
        return axios.get(Constants.USER_URL + 'schedule/first-worked-millis', { headers: authHeader() });
    }

    getSchedules() {
        return axios.get(Constants.USER_URL + 'schedules', { headers: authHeader() });
    }

    registerOnSchedule(scheduleId) {
        return axios.post(Constants.USER_URL + 'schedule/' + scheduleId, {}, { headers: authHeader() });
    }

    unregisterOnSchedule(scheduleId) {
        return axios.delete(Constants.USER_URL + 'schedule/' + scheduleId, { headers: authHeader() });
    }
}

export default new UserAPI();
