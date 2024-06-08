import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Importa tus componentes de vista
import Personal from '../views/Personal.vue';
import DetallesPersonal from '../components/DetallesTrabajador.vue';
import GestionTrabajador from '../components/MantenimientoTrabajador.vue';
import Vacaciones from '../views/Vacaciones.vue';
import Contrato from '../views/Contrato.vue';
import Capacitaciones from '../views/Capacitaciones.vue';
import Inducciones from '../views/Inducciones.vue';
import Asistencia from '../views/Asistencia.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path : '/personal',
    name : 'Personal',
    component : Personal
  },
  {
    path : '/asistencia',
    name : 'Asistencia',
    component : Asistencia
  },
  {
    path : '/vacaciones',
    name : 'Vacaciones',
    component : Vacaciones
  },
  {
    path : '/capacitaciones',
    name : 'Capacitaciones',
    component : Capacitaciones
  },
  {
    path : '/induccion',
    name : 'Inducciones',
    component : Inducciones
  },
  {
    path : '/contrato',
    name : 'Contrato',
    component : Contrato
  },
  {
    path : '/detallespersonal',
    name : 'DetallesPersonal',
    component : DetallesPersonal
  },
  {
    path : '/gestiontrabajador',
    name : 'GestionTrabajador',
    component : GestionTrabajador
  }
  // Añade más rutas según necesites
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
