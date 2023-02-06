<template>
  <div>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar
              flat
          >
            <v-btn
                variant="outlined"
                class="me-4"
                color="grey-darken-2"
                @click="setToday"
            >
              Today
            </v-btn>
            <v-btn
                fab
                variant="text"
                small
                color="grey-darken-2"
                @click="prev"
            >
              <v-icon>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
                fab
                variant="text"
                small
                color="grey-darken-2"
                @click="next"
            >
              <v-icon>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu location="bottom end">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    variant="outlined"
                    color="grey-darken-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon end>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Dia</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Semana</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mês</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 Dias</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
                color="success"
                @click="newEvent"
            >
              Novo Evento
            </v-btn>
          </v-toolbar>

        </v-sheet>
        <v-sheet height="600">
          <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
          ></v-calendar>



          <v-dialog
              fullscreen
              v-model="eventDialog"
          >
            <v-card>
              <v-card-title>
                Criar novo Evento
              </v-card-title>
              <v-container>
                <v-form>
                  <v-text-field label="Título" v-model="form.title"/>
                  <v-datetime-picker
                      label="Início"
                      okText="OK"
                      clearText="Limpar"
                      v-model="form.start"
                      dateFormat="dd/MM/yyyy"
                  >
                    <template slot="dateIcon">
                      <v-icon>mdi-calendar</v-icon>
                    </template>
                    <template slot="timeIcon">
                      <v-icon>mdi-clock-outline</v-icon>
                    </template>
                  </v-datetime-picker>
                  <v-datetime-picker
                      label="Termino"
                      okText="OK"
                      clearText="Limpar"
                      v-model="form.end"
                      dateFormat="dd/MM/yyyy"
                  >
                    <template slot="dateIcon">
                      <v-icon>mdi-calendar</v-icon>
                    </template>
                    <template slot="timeIcon">
                      <v-icon>mdi-clock-outline</v-icon>
                    </template>
                  </v-datetime-picker>
                  <v-textarea v-model="form.description" label="Descrição"/>
                  <v-select
                      v-model="form.color"
                      :items="colors"
                      label="Cor"
                  />
                  <v-switch v-model="form.allDay" label="Dia todo" />
                  <pre>{{JSON.stringify(form, null, 4)}}</pre>
                </v-form>
              </v-container>
              <v-card-actions>
                <v-btn color="primary" @click="saveEvent(form)">Salvar</v-btn>
                <v-btn color="secondary" @click="eventDialog = false">Cancelar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>


          <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
          >
            <v-card
                color="grey-lighten-4"
                min-width="350px"
                flat
            >
              <v-toolbar
                  :color="selectedEvent.color"
                  dark
              >
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                    variant="text"
                    color="secondary"
                    @click="selectedOpen = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>



        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-container>
      <pre>{{JSON.stringify(events, null, 4)}}</pre>
      </v-container>
    </v-row>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
export default {
  data: () => ({
    eventDialog: false,
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
      '4day': '4 Dias',
    },
    form: {
      title: '',
      start: '',
      end: '',
      description: '',
      color: '',
      allDay: false
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    newEvent() {
      this.eventDialog = true;
    },
    saveEvent(form) {
      this.events.push({
        name: form.title,
        start: form.start,
        end: form.end,
        description: form.description,
        color: form.color,
        timed: !form.allDay,
      });
      this.eventDialog = false;
    },
    updateRange ({ start, end }) {
      //TODO: Implementação de sincronização
      console.log('start', start);
      console.log('end', end);
    },
  },
}
</script>