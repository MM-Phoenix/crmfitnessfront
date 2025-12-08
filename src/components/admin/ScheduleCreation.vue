<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <div>{{ arg.timeText }}</div>
          <div>{{ arg.event.title }}</div>
        </template>
      </FullCalendar>
    </div>
  </div>

  <ModalComponent :isOpen="modalOpened" @modal-close="closeModal" @submit="createOrUpdateSchedule" name="first-modal">
    <template #header>
      <div v-show="!isDateSelectable()">Інформація про заняття</div>
      <div v-show="isDateSelectable()">{{ selectedEvent.id ? 'Оновити' : 'Додати тренування' }}</div>
    </template>
    <template #content>
      <div><i class="fa fa-clock-o"></i> {{ getEventTime() }}</div>
      <div><i class="fa fa-calendar"></i> {{ getEventDate() }}</div>

      <div v-show="selectedEvent.id === '' || selectedEvent.edit">
        <select id="trainers" class="w3-select" v-model="selectedEvent.trainerId">
          <option style="display:none" value="" selected>Оберіть тренера</option>
          <option v-for="trainer in trainers" :value="trainer.id">
            {{ trainer.firstName }} {{ trainer.lastName }}
          </option>
        </select>

        <select id="trainings" class="w3-select" v-model="selectedEvent.trainingId">
          <option style="display:none" value="" selected>Оберіть заняття</option>
          <option v-for="training in trainings" :value="training.id">
            {{ training.name }}
          </option>
        </select>
      </div>

      <div v-show="selectedEvent.id !== '' && !selectedEvent.edit">
        <div>{{ selectedEvent.trainer }}</div>
        <div>{{ selectedEvent.training }}</div>
      </div>

      <div v-for="registration in selectedEvent.registrations">
        {{ scheduleUsers[registration.userId].firstName }} {{ scheduleUsers[registration.userId].lastName }}
      </div>
    </template>
    <template #footer>
      <div v-show="selectedEvent.id === '' || isDateSelectable()" style="justify-content: space-between; width: 90%;display: flex;">
        <button class="fc-today-button" v-show="selectedEvent.id !== ''" @click="deleteSchedule">{{ 'Видалити' }}</button>

        <button class="fc-today-button" v-show="selectedEvent.id !== ''" @click="selectedEvent.edit = !selectedEvent.edit" >
          {{ selectedEvent.edit ? 'Відмінити' : 'Редагувати' }}
        </button>

        <button class="fc-today-button" :disabled="selectedEvent.id !== '' && !selectedEvent.edit" @click="createOrUpdateSchedule">
          {{ selectedEvent.id ? 'Оновити' : 'Створити' }}
        </button>
      </div>
    </template>
  </ModalComponent>
</template>

<script>
import {defineComponent} from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import ModalComponent from "../ModalComponent";
import AdminAPI from "@/api/AdminAPI";
import UserAPI from "@/api/UserAPI";

export default defineComponent({
  name: "ScheduleCreation",
  components: {
    FullCalendar, ModalComponent,
  },
  data() {
    return {
      eventGuid: 0,
      calendarOptions: {
        locale: "uk",
        allDayText: "Весь день",
        buttonText: {
          today: "Сьогодні",
          month: "Місяць",
          week: "Тиждень",
          day: "День",
          list: "Список"
        },
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
        },
        initialView: 'timeGridWeek',
        eventDidMount: function (info) {
          info.el.classList.remove('fc-timegrid-event');
          new Tooltip(info.el, {
            title: info.event.extendedProps.trainer,
            placement: 'top',
            trigger: 'hover',
            container: 'body'
          });
        },
        events: [],
        selectable: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      },
      currentEvents: [],
      trainers: [],
      trainings: [],
      scheduleUsers: [],
      eventInfo: {},
      selectedEvent: {},
      modalOpened: false,
      firstWorkedMillis: 0,
    }
  },
  methods: {
    handleDateSelect(selectInfo) {
      selectInfo.view.calendar.unselect() // clear date selection

      if (this.isDateSelectable(selectInfo.start) === true) {
        this.eventInfo = selectInfo;
        this.selectedEvent.id = '';
        this.selectedEvent.title = '';
        this.selectedEvent.trainer = '';
        this.selectedEvent.trainerId = '';
        this.selectedEvent.training = '';
        this.selectedEvent.trainingId = '';
        this.selectedEvent.registrations = [];
        this.selectedEvent.startStr = selectInfo.startStr;
        this.selectedEvent.startDate = selectInfo.start;
        this.selectedEvent.endStr = selectInfo.endStr;
        this.selectedEvent.endDate = selectInfo.end;
        this.selectedEvent.edit = false;
        this.openModal();
      }
    },
    handleEventClick(clickInfo) {
      this.eventInfo = clickInfo;
      this.selectedEvent.id = clickInfo.event.id;
      this.selectedEvent.title = clickInfo.event.title;
      this.selectedEvent.trainer = clickInfo.event.extendedProps.trainer;
      this.selectedEvent.trainerId = clickInfo.event.extendedProps.trainerId;
      this.selectedEvent.training = clickInfo.event.extendedProps.training;
      this.selectedEvent.trainingId = clickInfo.event.extendedProps.trainingId;
      this.selectedEvent.registrations = clickInfo.event.extendedProps.registrations;
      this.selectedEvent.startStr = clickInfo.event.startStr;
      this.selectedEvent.startDate = clickInfo.event.start;
      this.selectedEvent.endStr = clickInfo.event.endStr;
      this.selectedEvent.endDate = clickInfo.event.end;
      this.selectedEvent.edit = false
      this.openModal();
    },
    handleEvents(events) {
      this.currentEvents = events
    },
    openModal() {
      this.modalOpened = true;
    },
    closeModal() {
      this.modalOpened = false;
    },
    createOrUpdateSchedule() {
      if (this.selectedEvent.startStr !== '' && this.selectedEvent.trainerId !== '' && this.selectedEvent.trainingId !== '') {
        if (this.selectedEvent.edit === false) {
          AdminAPI.createSchedule(new Date(this.selectedEvent.startStr).getTime(), this.selectedEvent.trainerId, this.selectedEvent.trainingId).then(
              (result) => {
                if (result.status === 200) {
                  this.eventInfo.view.calendar.addEvent(this.getFilledEvent(result.data))
                  this.closeModal();
                }
              }
          )
        } else {
          AdminAPI.updateSchedule(new Date(this.selectedEvent.startStr).getTime(), this.selectedEvent.trainerId, this.selectedEvent.trainingId).then(
              (result) => {
                if (result.status === 200) {
                  this.eventInfo.event.remove();
                  this.eventInfo.view.calendar.addEvent(this.getFilledEvent(result.data))
                  this.closeModal();
                }
              }
          )
        }
      }
    },
    deleteSchedule() {
      AdminAPI.deleteSchedule(this.selectedEvent.id).then(
          (result) => {
            this.eventInfo.event.remove();
            this.closeModal();
          }
      )
    },
    getFilledEvent(schedule) {
      return {
        id: schedule.dateFrom,
        title: schedule.training.name,
        start: new Date(schedule.dateFrom),
        end: new Date(schedule.dateTo),
        allDay: false,
        trainer: schedule.trainer.firstName + ' ' + schedule.trainer.lastName,
        trainerId: schedule.trainer.id,
        training: schedule.training.name,
        trainingId: schedule.training.id,
        registrations: schedule.registrations,
        color: this.isDateSelectable(new Date(schedule.dateFrom)) ? '#1E252B' : '#A9A9A9FF',
        // backgroundColor: 'green'
      }
    },
    isDateSelectable(date) {
      if (date) {
        return this.firstWorkedMillis < date.getTime();
      } else {
        return this.firstWorkedMillis < this.selectedEvent.startDate.getTime();
      }
    },
    getEventTime() {
      return this.selectedEvent.startDate.toLocaleTimeString('uk-UA',
          {weekday: 'short', hour: '2-digit', minute: '2-digit'});
    },
    getEventDate() {
      return this.selectedEvent.startDate.toLocaleDateString('uk-UA',
          {month: 'short', day: 'numeric', year: 'numeric'});
    }
  },
  created() {
    UserAPI.getScheduleFirstWorkedMillis().then(
        (result) => {
          this.firstWorkedMillis = result.data;

          UserAPI.getSchedules().then(
              (result) => {
                for (let id in result.data) {
                  this.calendarOptions.events.push(this.getFilledEvent(result.data[id]));
                }
              }
          )

          AdminAPI.getScheduleUsers().then(
              (result) => {
                this.scheduleUsers = result.data;
              }
          )
        }
    )

    AdminAPI.getTrainers().then(
        (result) => {
          for (let id in result.data) {
            this.trainers.push(result.data[id]);
          }
        }
    )

    AdminAPI.getTrainings().then(
        (result) => {
          for (let id in result.data) {
            this.trainings.push(result.data[id]);
          }
        }
    )
  }
})
</script>
