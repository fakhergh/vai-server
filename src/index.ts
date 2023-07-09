import { App } from '@/app';
import { AuthController } from '@controllers/auth.controller';
import { AppointmentController } from '@controllers/appointments.controller';
import { DoctorController } from '@controllers/doctors.controller';
import { PatientController } from '@controllers/patients.controller';
import { HealthController } from '@controllers/health.controller';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([AuthController, AppointmentController, DoctorController, HealthController, PatientController]);
app.listen();
