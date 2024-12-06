import authHeader from '../store/authHeader';
import Constants from "@/api/Constants";
import axios from "axios";

class AdminAPI {

    createClient(user) {
        return axios.post(Constants.ADMIN_URL + 'client/signup', user, {headers: authHeader(),});
    }

    createTrainer(user) {
        return axios.post(Constants.ADMIN_URL + 'trainer/signup', user, {headers: authHeader(),});
    }

    getSubscriptions() {
        return axios.get(Constants.ADMIN_URL + 'subscriptions', {headers: authHeader()});
    }

    getClients() {
        return axios.get(Constants.ADMIN_URL + 'users/clients', {headers: authHeader()});
    }

    setUserSubscription(userId, subscriptionType) {
        return axios.post(Constants.ADMIN_URL + 'user/subscription', {
                userId: userId,
                subscriptionType: subscriptionType
            }, {headers: authHeader()}
        );
    }

    getTrainers() {
        return axios.get(Constants.ADMIN_URL + 'users/trainers', {headers: authHeader()});
    }

    getTrainings() {
        return axios.get(Constants.ADMIN_URL + 'trainings', {headers: authHeader()});
    }

    createSchedule(dateFrom, trainerId, trainingId) {
        return axios.post(Constants.ADMIN_URL + 'schedule', {
            dateFrom, trainerId, trainingId
        }, {headers: authHeader()})
    }

    updateSchedule(dateFrom, trainerId, trainingId) {
        return axios.put(Constants.ADMIN_URL + 'schedule',
            {dateFrom, trainerId, trainingId}, {headers: authHeader()})
    }

    deleteSchedule(scheduleId) {
        return axios.delete(Constants.ADMIN_URL + 'schedule/' + scheduleId, {headers: authHeader()});
    }

    getScheduleUsers() {
        return axios.get(Constants.ADMIN_URL + 'schedule/users', {headers: authHeader()});
    }
}

export default new AdminAPI();
