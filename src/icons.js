import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faTh, faComment, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faTwitter, faHackerrank } from '@fortawesome/free-brands-svg-icons'

library.add(faHome, faTh, faComment, faUserAstronaut, faGithub, faLinkedin, faTwitter, faHackerrank)
Vue.component('fa-icon', FontAwesomeIcon)