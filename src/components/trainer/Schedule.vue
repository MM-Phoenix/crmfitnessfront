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

  <ModalComponent :isOpen="modalOpened" @modal-close="closeModal" name="first-modal">
    <template #header>
      <div v-show="!isDateSelectable()">Training info</div>
      <div v-show="isDateSelectable()">
        {{ ScheduleService.isUserScheduledEvent(selectedEvent.id) ? 'Signed up' : 'Training info' }}
      </div>
    </template>
    <template #content>
      <div><i class="fa fa-clock-o"></i> {{ getEventTime() }}</div>
      <div><i class="fa fa-calendar"></i> {{ getEventDate() }}</div>

      <div>{{ selectedEvent.trainer }}</div>
      <div>{{ selectedEvent.training }}</div>

      <div>Registrations count: {{ selectedEvent.registrations.length }}</div>
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
import UserAPI from "@/api/UserAPI";
import ScheduleService from "@/services/schedule/ScheduleService";
import AdminAPI from "@/api/AdminAPI";

export default defineComponent({
  name: "Schedule",
  components: {
    FullCalendar, ModalComponent
  },
  data() {
    return {
      eventGuid: 0,
      calendarOptions: {
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
        allDaySlot: false,
        dayCellDidMount: function (i) {
          i.el.style.cursor = 'pointer';
        },
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      },
      currentEvents: [],
      trainers: [],
      trainings: [],
      eventInfo: {},
      selectedEvent: {
        id: '',
        title: '',
        trainer: '',
        trainerId: '',
        training: '',
        trainingId: '',
        startStr: '',
        startDate: '',
        endStr: '',
        endDate: '',
      },
      modalOpened: false,
      firstWorkedMillis: 0,
      ScheduleService
    }
  },
  methods: {
    handleDateSelect(selectInfo) {
      selectInfo.view.calendar.unselect();
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
        color: this.isDateSelectable(new Date(schedule.dateFrom)) && ScheduleService.isTrainerScheduleEvent(schedule.trainer.id) ? '#1E252B' : '#A9A9A9FF'
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
      return this.selectedEvent.startDate.toLocaleTimeString(navigator.language,
          {weekday: 'short', hour: '2-digit', minute: '2-digit'});
    },
    getEventDate() {
      return this.selectedEvent.startDate.toLocaleDateString(navigator.language,
          {month: 'short', day: 'numeric', year: 'numeric'});
    },
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
        }
    )
  }
})
</script>
