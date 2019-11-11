import { Router } from 'express';


import Doctor from './app/models/Doctor';

import DoctorController from './app/controllers/DoctorController';
import SpecialtieController from './app/controllers/SpecialtieController';

const routes = new Router();

routes.post('/doctor', DoctorController.store);
routes.get('/doctor', DoctorController.index);
routes.put('/doctor/:id', DoctorController.update);
routes.delete('/doctor/:id', DoctorController.delete);

routes.post('/specialtie', SpecialtieController.store);
routes.get('/specialtie', SpecialtieController.index);



export default routes;

