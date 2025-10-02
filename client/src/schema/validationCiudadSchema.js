import * as yup from 'yup';

export const validationCiudadSchema = yup.object({
    ciudad: yup.string().required('La ciudad es obligatoria').min(3, 'La ciudad debe tener al menos 3 caracteres'),
});