import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTh, faEnvelope, faUserAstronaut, faRocket } from '@fortawesome/free-solid-svg-icons'
import { faHouzz, faGithub, faLinkedin, faTwitter, faHackerrank } from '@fortawesome/free-brands-svg-icons'

library.add(faHouzz, faTh, faEnvelope, faUserAstronaut, faRocket, faGithub, faLinkedin, faTwitter, faHackerrank)
Vue.component('fa-icon', FontAwesomeIcon)